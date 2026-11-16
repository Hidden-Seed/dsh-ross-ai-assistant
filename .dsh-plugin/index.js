// Copyright (C) 2026, Advanced Micro Devices, Inc. All rights reserved.
// SPDX-License-Identifier: MIT

import { createRequire } from 'node:module'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const PROVIDER_NAME = 'amd-ross'
const SKILLS_DIR = join(import.meta.dirname, '..', 'skills')

function skillProviderModule(ctx) {
  const profile = ctx.get('profileContext')
  const anchor = profile?.installAnchor
    ?? (process.env.DSH_INSTALL_DIR === undefined ? undefined : join(process.env.DSH_INSTALL_DIR, 'package.json'))
  if (anchor === undefined) {
    throw new Error('AMD Ross skills: the DeepSeek Harness installation anchor is unavailable')
  }
  return pathToFileURL(createRequire(anchor).resolve('@deepseek-ai/dsh-skill-filesystem')).href
}

export const name = 'amd-ross-skills'
export const inject = ['skills']

export function apply(ctx) {
  let provider
  let opening

  const open = (control) => {
    opening ??= (async () => {
      control.signal.throwIfAborted()
      // Reuse the shipped frontmatter parser and watcher; only the root is ours.
      // The constructor contract is undocumented; verified against DSH 0.2.2-rc.3.
      const { FileSystemSkillProvider } = await import(skillProviderModule(ctx))
      control.signal.throwIfAborted()
      provider = new FileSystemSkillProvider(
        // Trusted plugin files are read directly, not through the workspace filesystem.
        { get: () => undefined, logger: ctx.logger },
        control,
        {
          providerName: PROVIDER_NAME,
          includeDefaultRoots: false,
          customSkillDirs: [SKILLS_DIR],
        },
      )
      return provider
    })().catch((error) => {
      opening = undefined
      throw error
    })
    return opening
  }

  ctx.effect(function* () {
    yield async () => { await provider?.dispose() }
  })

  ctx.skills.registerProvider((control) => ({
    name: PROVIDER_NAME,
    async list(options) {
      return (await open(control)).list(options)
    },
    async get(candidate, options) {
      return (await open(control)).get(candidate, options)
    },
  }))
}
