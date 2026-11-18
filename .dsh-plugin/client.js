// Copyright (C) 2026, Advanced Micro Devices, Inc. All rights reserved.
// SPDX-License-Identifier: MIT

window.__ModuleLoader__.load({
  id: '@hidden-seed/dsh-ross-ai-assistant',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'amdRossSettings'
    const HOSTED_DOC_URL = 'https://vivado.amd.com/mcp/doc-search'
    const VIVADO_SERVER = 'vivado-mcp'
    const DOC_SERVER = 'amd-doc-search'

    const EN = {
      nav: 'AMD Ross',
      description: 'Configure the MCP servers used by the AMD Ross skills. Values are saved in this profile\u2019s MCP manager settings.',
      vivadoTitle: 'Vivado MCP server',
      vivadoEnable: 'Enable the Vivado MCP server',
      vivadoServer: 'MCP server binary',
      vivadoServerHint: 'Absolute path to the Linux or Windows vivado-mcp-server executable on the Host that runs DeepSeek Harness. A missing file appears in the MCP server status when the Host starts it.',
      vivadoPath: 'Vivado executable',
      vivadoPathHint: 'Passed to the server as VIVADO_PATH. Leave empty when Vivado is on the Host PATH.',
      vivadoArgsHint: 'New entries start with --stdio-bridge; existing arguments are kept.',
      enableFirst: 'Enable the server to edit these fields.',
      transportMismatch: 'An existing {name} entry uses transport {transport}. This page manages {expected}; it leaves the entry unchanged unless you enable it and save.',
      docTitle: 'Documentation search MCP server',
      docEnable: 'Enable documentation search',
      docUrl: 'MCP URL',
      docUrlHint: 'Streamable HTTP endpoint. Hosted: https://vivado.amd.com/mcp/doc-search. Local knowledge base: http://127.0.0.1:8080/mcp/doc-search.',
      docPrivacy: 'Enabling documentation search sends search queries to this endpoint.',
      save: 'Save',
      saving: 'Saving\u2026',
      discard: 'Discard',
      saved: 'Saved.',
      refused: 'The Host refused the change. Reload the settings and try again.',
      failed: 'Could not save:',
      requiredServer: 'Enter the MCP server binary path before enabling the Vivado server.',
      absoluteServer: 'Enter an absolute path to the MCP server binary.',
      invalidUrl: 'Enter an http or https URL.',
      noChanges: 'No unsaved changes.',
      missingManager: 'This profile does not mount the MCP manager. Add the vivado-mcp and amd-doc-search @deepseek-ai/dsh-mcp-client rows to the profile patch instead.',
      notWritable: 'This Host does not accept settings writes.',
      loading: 'Loading MCP settings\u2026',
      loadError: 'Could not load the MCP settings:',
      noServers: 'Enable at least one server to save a change.',
    }

    const ZH = {
      nav: 'AMD Ross',
      description: '\u914d\u7f6e AMD Ross \u6280\u80fd\u4f7f\u7528\u7684 MCP \u670d\u52a1\u5668\u3002\u8bbe\u7f6e\u4fdd\u5b58\u5728\u5f53\u524d profile \u7684 MCP \u7ba1\u7406\u5668\u914d\u7f6e\u4e2d\u3002',
      vivadoTitle: 'Vivado MCP \u670d\u52a1\u5668',
      vivadoEnable: '\u542f\u7528 Vivado MCP \u670d\u52a1\u5668',
      vivadoServer: 'MCP \u670d\u52a1\u5668\u7a0b\u5e8f',
      vivadoServerHint: '运行 DeepSeek Harness 的 Linux 或 Windows 主机上 vivado-mcp-server 可执行文件的绝对路径。文件不存在时，MCP 服务器启动状态会报告。',
      vivadoPath: 'Vivado \u53ef\u6267\u884c\u6587\u4ef6',
      vivadoPathHint: '\u4f5c\u4e3a VIVADO_PATH \u4f20\u7ed9\u670d\u52a1\u5668\u3002\u5982\u679c Vivado \u5df2\u5728\u4e3b\u673a PATH \u4e0a\uff0c\u53ef\u4ee5\u7559\u7a7a\u3002',
      vivadoArgsHint: '\u65b0\u5efa\u6761\u76ee\u4f7f\u7528 --stdio-bridge \u542f\u52a8\uff1b\u5df2\u6709\u6761\u76ee\u4fdd\u7559\u5176\u53c2\u6570\u3002',
      enableFirst: '启用服务器后才能编辑这些字段。',
      transportMismatch: '已有 {name} 条目使用 {transport} 传输。本页管理 {expected}；除非启用并保存，否则不会修改该条目。',
      docTitle: '\u6587\u6863\u68c0\u7d22 MCP \u670d\u52a1\u5668',
      docEnable: '\u542f\u7528\u6587\u6863\u68c0\u7d22',
      docUrl: 'MCP \u5730\u5740',
      docUrlHint: 'Streamable HTTP \u7aef\u70b9\u3002\u6258\u7ba1\u670d\u52a1\uff1ahttps://vivado.amd.com/mcp/doc-search\u3002\u672c\u5730\u77e5\u8bc6\u5e93\uff1ahttp://127.0.0.1:8080/mcp/doc-search\u3002',
      docPrivacy: '\u542f\u7528\u6587\u6863\u68c0\u7d22\u540e\uff0c\u68c0\u7d22\u5185\u5bb9\u4f1a\u53d1\u9001\u5230\u8fd9\u4e2a\u7aef\u70b9\u3002',
      save: '\u4fdd\u5b58',
      saving: '\u6b63\u5728\u4fdd\u5b58\u2026',
      discard: '\u653e\u5f03\u4fee\u6539',
      saved: '\u5df2\u4fdd\u5b58\u3002',
      refused: '\u4e3b\u673a\u62d2\u7edd\u4e86\u8fd9\u6b21\u4fee\u6539\u3002\u8bf7\u91cd\u65b0\u52a0\u8f7d\u8bbe\u7f6e\u540e\u91cd\u8bd5\u3002',
      failed: '\u4fdd\u5b58\u5931\u8d25\uff1a',
      requiredServer: '\u542f\u7528 Vivado \u670d\u52a1\u5668\u524d\uff0c\u8bf7\u586b\u5199 MCP \u670d\u52a1\u5668\u7a0b\u5e8f\u8def\u5f84\u3002',
      absoluteServer: '请填写 MCP 服务器程序的绝对路径。',
      invalidUrl: '\u8bf7\u586b\u5199 http \u6216 https \u5730\u5740\u3002',
      noChanges: '没有未保存的修改。',
      missingManager: '\u5f53\u524d profile \u6ca1\u6709\u6302\u8f7d MCP \u7ba1\u7406\u5668\u3002\u8bf7\u5728 profile patch \u4e2d\u6dfb\u52a0 vivado-mcp \u548c amd-doc-search \u7684 @deepseek-ai/dsh-mcp-client \u884c\u3002',
      notWritable: '\u5f53\u524d\u4e3b\u673a\u4e0d\u63a5\u53d7\u8bbe\u7f6e\u5199\u5165\u3002',
      loading: '\u6b63\u5728\u52a0\u8f7d MCP \u8bbe\u7f6e\u2026',
      loadError: '\u65e0\u6cd5\u52a0\u8f7d MCP \u8bbe\u7f6e\uff1a',
      noServers: '\u8bf7\u81f3\u5c11\u542f\u7528\u4e00\u4e2a\u670d\u52a1\u5668\u540e\u518d\u4fdd\u5b58\u3002',
    }

    const CSS = `
.ars-page { display: flex; flex-direction: column; gap: 24px; width: 100%; padding-bottom: 8px; box-sizing: border-box; }
.ars-desc { margin: 0; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.ars-block { display: flex; flex-direction: column; gap: 12px; }
.ars-block + .ars-block { border-top: 0.5px solid var(--dsw-alias-border-l1); padding-top: 20px; }
.ars-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; }
.ars-title { margin: 0; font-size: 14px; font-weight: 600; line-height: 20px; color: var(--dsw-alias-label-primary); }
.ars-toggle { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-primary); cursor: pointer; }
.ars-toggle input { margin: 0; accent-color: var(--dsw-alias-brand-primary); }
.ars-field { display: flex; flex-direction: column; gap: 6px; }
.ars-label { font-size: 13px; font-weight: 500; line-height: 20px; color: var(--dsw-alias-label-primary); }
.ars-input { width: 100%; height: 34px; padding: 0 10px; box-sizing: border-box; border: 0.5px solid var(--dsw-alias-border-l2); border-radius: var(--dsw-radius-md, 8px); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; }
.ars-input:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; border-color: var(--dsw-alias-brand-primary); }
.ars-input:disabled { color: var(--dsw-alias-label-secondary); cursor: default; }
.ars-hint { margin: 0; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.ars-warn { color: var(--dsw-alias-state-warn-primary); }
.ars-note { padding: 12px 14px; border: 0.5px solid var(--dsw-alias-border-l1); border-radius: var(--dsw-radius-md, 8px); background: var(--dsw-alias-bg-layer-1); font-size: 13px; line-height: 20px; color: var(--dsw-alias-label-secondary); }
.ars-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; }
.ars-button { height: 32px; padding: 0 14px; border: 0.5px solid var(--dsw-alias-border-l2); border-radius: var(--dsw-radius-md, 8px); background: var(--dsw-alias-bg-layer-1); color: var(--dsw-alias-label-primary); font: inherit; font-size: 13px; cursor: pointer; }
.ars-button:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ars-button:disabled { opacity: 0.5; cursor: default; }
.ars-button.ars-primary { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary); background: transparent; }
.ars-status { margin: 0; flex: 1 1 180px; min-width: 0; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary); }
.ars-status.ars-error { color: var(--dsw-alias-state-error-primary); }
.ars-status.ars-saved { color: var(--dsw-alias-state-success-primary); }
`

    function Icon({ size = 16 }) {
      return h('svg', {
        width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        'aria-hidden': 'true', focusable: 'false',
      }, h('path', {
        d: 'M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19ZM9 9H15V15H9V9Z',
        stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
      }))
    }

    function useSnapshot(store) {
      const [snapshot, setSnapshot] = React.useState(() => store.getSnapshot())
      React.useEffect(() => {
        setSnapshot(store.getSnapshot())
        return store.subscribe(() => { setSnapshot(store.getSnapshot()) })
      }, [store])
      return snapshot
    }

    function useOptionalSnapshot(store) {
      const [snapshot, setSnapshot] = React.useState(() => store === undefined ? undefined : store.getSnapshot())
      React.useEffect(() => {
        if (store === undefined) {
          setSnapshot(undefined)
          return
        }
        setSnapshot(store.getSnapshot())
        return store.subscribe(() => { setSnapshot(store.getSnapshot()) })
      }, [store])
      return snapshot
    }

    // The MCP manager is the settings namespace whose volatile value carries a
    // `servers` map. Match on the value: the settings descriptor's serialized
    // schema is schemastery-shaped, not always JSON-Schema `properties`.
    function findManagerNamespace(view) {
      if (view === undefined) return undefined
      const rows = view.namespaces.filter((row) => {
        const value = row.value
        return value !== null && typeof value === 'object' && !Array.isArray(value)
          && Object.prototype.hasOwnProperty.call(value, 'servers')
          && value.servers !== null && typeof value.servers === 'object'
      })
      const preferred = rows.find((row) => typeof row.ns === 'string' && row.ns.includes('mcp'))
      return (preferred ?? rows[0])?.ns
    }

    function serversOf(value) {
      const servers = value !== null && typeof value === 'object' ? value.servers : undefined
      return servers !== null && typeof servers === 'object' ? servers : {}
    }

    function readDraft(value) {
      const servers = serversOf(value)
      const vivado = servers[VIVADO_SERVER] !== null && typeof servers[VIVADO_SERVER] === 'object' ? servers[VIVADO_SERVER] : undefined
      const doc = servers[DOC_SERVER] !== null && typeof servers[DOC_SERVER] === 'object' ? servers[DOC_SERVER] : undefined
      const env = vivado !== undefined && vivado.env !== null && typeof vivado.env === 'object' ? vivado.env : {}
      return {
        vivadoEnabled: vivado !== undefined && vivado.enabled !== false && vivado.transport === 'stdio',
        vivadoServer: vivado !== undefined && typeof vivado.command === 'string' ? vivado.command : '',
        vivadoPath: typeof env.VIVADO_PATH === 'string' ? env.VIVADO_PATH : '',
        docEnabled: doc !== undefined && doc.enabled !== false && doc.transport === 'streamable-http' && typeof doc.url === 'string',
        docUrl: doc !== undefined && typeof doc.url === 'string' && doc.url !== '' ? doc.url : HOSTED_DOC_URL,
      }
    }

    function isAbsolutePath(value) {
      return value.startsWith('/') || /^[A-Za-z]:[\\/]/.test(value) || value.startsWith('\\\\')
    }

    function sameDraft(left, right) {
      return left.vivadoEnabled === right.vivadoEnabled
        && left.vivadoServer === right.vivadoServer
        && left.vivadoPath === right.vivadoPath
        && left.docEnabled === right.docEnabled
        && left.docUrl === right.docUrl
    }

    function isHttpUrl(value) {
      try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch {
        return false
      }
    }

    function pick(entry, keys) {
      const picked = {}
      if (entry === undefined) return picked
      for (const key of keys) {
        if (entry[key] !== undefined) picked[key] = entry[key]
      }
      return picked
    }

    function buildOps(draft, value) {
      const servers = serversOf(value)
      const vivado = servers[VIVADO_SERVER] !== null && typeof servers[VIVADO_SERVER] === 'object' ? servers[VIVADO_SERVER] : undefined
      const doc = servers[DOC_SERVER] !== null && typeof servers[DOC_SERVER] === 'object' ? servers[DOC_SERVER] : undefined
      const ops = []
      if (draft.vivadoEnabled) {
        const command = draft.vivadoServer.trim()
        if (command === '') return { error: 'requiredServer' }
        if (!isAbsolutePath(command)) return { error: 'absoluteServer' }
        const env = vivado !== undefined && vivado.env !== null && typeof vivado.env === 'object' ? { ...vivado.env } : {}
        const vivadoPath = draft.vivadoPath.trim()
        if (vivadoPath === '') delete env.VIVADO_PATH
        else env.VIVADO_PATH = vivadoPath
        const entry = {
          ...pick(vivado, ['cwd', 'toolCallTimeoutMs', 'startupTimeoutMs', 'closeTimeoutMs', 'reconnect']),
          transport: 'stdio',
          command,
          args: vivado !== undefined && Array.isArray(vivado.args) && vivado.args.length > 0 ? vivado.args : ['--stdio-bridge'],
          ...(Object.keys(env).length > 0 ? { env } : {}),
          enabled: true,
        }
        ops.push({ op: 'set', path: ['servers', VIVADO_SERVER], value: entry })
      } else if (vivado !== undefined && vivado.transport === 'stdio' && vivado.enabled !== false) {
        ops.push({ op: 'set', path: ['servers', VIVADO_SERVER], value: { ...vivado, enabled: false } })
      }
      if (draft.docEnabled) {
        const url = draft.docUrl.trim() === '' ? HOSTED_DOC_URL : draft.docUrl.trim()
        if (!isHttpUrl(url)) return { error: 'invalidUrl' }
        const entry = {
          ...pick(doc, ['headers', 'toolCallTimeoutMs', 'startupTimeoutMs', 'closeTimeoutMs', 'reconnect']),
          transport: 'streamable-http',
          url,
          enabled: true,
        }
        ops.push({ op: 'set', path: ['servers', DOC_SERVER], value: entry })
      } else if (doc !== undefined && doc.transport === 'streamable-http' && doc.enabled !== false) {
        ops.push({ op: 'set', path: ['servers', DOC_SERVER], value: { ...doc, enabled: false } })
      }
      return { ops }
    }

    function apply(ctx) {
      const t = ctx.locale.bind(NS)
      ctx.effect(() => ctx.locale.register(NS, { en: EN, zh: ZH }), 'amd-ross: locale')
      ctx.effect(() => ctx.slots.inject('settings.section.icon', () => ctx.slots.register({
        name: 'settings.section.icon', id: 'amd-ross',
      }, Icon)), 'amd-ross: settings icon')

      function SettingsPage(props) {
        const translate = props.t ?? t
        const [draft, setDraft] = React.useState(null)
        const [saving, setSaving] = React.useState(false)
        const [status, setStatus] = React.useState({ kind: 'idle', text: '' })
        const [errorField, setErrorField] = React.useState(null)
        const touched = React.useRef(false)
        const vivadoServerInput = React.useRef(null)
        const docUrlInput = React.useRef(null)
        const describe = React.useMemo(() => ctx.configForms.describe(), [])
        const describeSnapshot = useSnapshot(describe)
        React.useEffect(() => { void describe.ensure() }, [describe])
        const namespace = findManagerNamespace(describeSnapshot.view)
        const form = React.useMemo(() => namespace === undefined ? undefined : ctx.configForms.get(namespace), [namespace])
        const formSnapshot = useOptionalSnapshot(form)
        const revision = formSnapshot === undefined ? undefined : formSnapshot.revision
        React.useEffect(() => {
          if (touched.current) return
          if (formSnapshot !== undefined && formSnapshot.status === 'ready' && formSnapshot.value !== undefined) {
            setDraft(readDraft(formSnapshot.value))
          }
        }, [revision, formSnapshot === undefined ? undefined : formSnapshot.status])
        React.useEffect(() => {
          if (formSnapshot === undefined) {
            touched.current = false
            setDraft(null)
          }
        }, [formSnapshot])
        const writable = formSnapshot !== undefined && formSnapshot.writable
        const current = formSnapshot !== undefined && formSnapshot.status === 'ready' && formSnapshot.value !== undefined
          ? readDraft(formSnapshot.value) : undefined
        const servers = formSnapshot !== undefined && formSnapshot.status === 'ready' && formSnapshot.value !== undefined
          ? serversOf(formSnapshot.value) : {}
        const vivadoEntry = servers[VIVADO_SERVER] !== null && typeof servers[VIVADO_SERVER] === 'object' ? servers[VIVADO_SERVER] : undefined
        const docEntry = servers[DOC_SERVER] !== null && typeof servers[DOC_SERVER] === 'object' ? servers[DOC_SERVER] : undefined
        const vivadoMismatch = vivadoEntry !== undefined && vivadoEntry.transport !== 'stdio'
        const docMismatch = docEntry !== undefined && docEntry.transport !== 'streamable-http'
        const dirty = draft !== null && current !== undefined && !sameDraft(draft, current)
        const fieldsDisabled = !writable || saving

        function edit(field, value) {
          touched.current = true
          setDraft((previous) => previous === null ? previous : { ...previous, [field]: value })
          setStatus({ kind: 'idle', text: '' })
          setErrorField(null)
        }

        function toggleVivado(checked) {
          touched.current = true
          setDraft((previous) => previous === null ? previous : {
            ...previous,
            vivadoEnabled: checked,
            ...(checked ? {} : { vivadoServer: current?.vivadoServer ?? '', vivadoPath: current?.vivadoPath ?? '' }),
          })
          setStatus({ kind: 'idle', text: '' })
          setErrorField(null)
        }

        function toggleDoc(checked) {
          touched.current = true
          setDraft((previous) => previous === null ? previous : {
            ...previous,
            docEnabled: checked,
            ...(checked ? {} : { docUrl: current?.docUrl ?? HOSTED_DOC_URL }),
          })
          setStatus({ kind: 'idle', text: '' })
          setErrorField(null)
        }

        async function save() {
          if (form === undefined || formSnapshot === undefined || draft === null) return
          const built = buildOps(draft, formSnapshot.value)
          if (built.error !== undefined) {
            setStatus({ kind: 'error', text: translate(built.error) })
            if (built.error === 'requiredServer' || built.error === 'absoluteServer') {
              setErrorField('vivadoServer')
              vivadoServerInput.current?.focus()
            } else if (built.error === 'invalidUrl') {
              setErrorField('docUrl')
              docUrlInput.current?.focus()
            }
            return
          }
          setErrorField(null)
          if (built.ops.length === 0) {
            setStatus({ kind: 'error', text: translate('noServers') })
            return
          }
          setSaving(true)
          setStatus({ kind: 'idle', text: '' })
          try {
            const accepted = await form.mutate(built.ops, formSnapshot.revision)
            if (accepted) touched.current = false
            setErrorField(null)
            setStatus(accepted
              ? { kind: 'saved', text: translate('saved') }
              : { kind: 'error', text: translate('refused') })
          } catch (error) {
            setErrorField(null)
            setStatus({ kind: 'error', text: `${translate('failed')} ${error instanceof Error ? error.message : String(error)}` })
          } finally {
            setSaving(false)
          }
        }

        function discard() {
          touched.current = false
          if (formSnapshot !== undefined && formSnapshot.status === 'ready' && formSnapshot.value !== undefined) {
            setDraft(readDraft(formSnapshot.value))
          }
          setStatus({ kind: 'idle', text: '' })
          setErrorField(null)
        }

        const page = (content) => h('div', { className: 'ars-page' },
          h('style', { key: 'style' }, CSS),
          h('p', { className: 'ars-desc' }, translate('description')),
          content)

        if (describeSnapshot.view === undefined) {
          return page(describeSnapshot.error === null
            ? h('p', { className: 'ars-hint' }, translate('loading'))
            : h('div', { className: 'ars-note' }, `${translate('loadError')} ${describeSnapshot.error}`))
        }
        if (namespace === undefined) {
          return page(h('div', { className: 'ars-note' }, translate('missingManager')))
        }
        if (formSnapshot === undefined || formSnapshot.status === 'loading' || (formSnapshot.status === 'ready' && draft === null)) {
          return page(h('p', { className: 'ars-hint' }, translate('loading')))
        }
        if (formSnapshot.status === 'unavailable') {
          return page(h('div', { className: 'ars-note' }, translate('missingManager')))
        }

        const statusClass = status.kind === 'error' ? 'ars-status ars-error'
          : status.kind === 'saved' ? 'ars-status ars-saved' : 'ars-status'
        return page([
          h('section', { key: 'vivado', className: 'ars-block' },
            h('div', { className: 'ars-head' },
              h('h3', { className: 'ars-title' }, translate('vivadoTitle')),
              h('label', { className: 'ars-toggle' },
                h('input', {
                  type: 'checkbox', checked: draft.vivadoEnabled, disabled: fieldsDisabled,
                  onChange: (event) => { toggleVivado(event.target.checked) },
                }),
                translate('vivadoEnable'))),
            vivadoMismatch
              ? h('p', { className: 'ars-hint ars-warn' }, translate('transportMismatch', { name: VIVADO_SERVER, transport: String(vivadoEntry.transport), expected: 'stdio' }))
              : draft.vivadoEnabled ? null : h('p', { className: 'ars-hint' }, translate('enableFirst')),
            h('div', { className: 'ars-field' },
              h('label', { className: 'ars-label', htmlFor: 'ars-vivado-server' }, translate('vivadoServer')),
              h('input', {
                id: 'ars-vivado-server', ref: vivadoServerInput, className: 'ars-input', type: 'text', value: draft.vivadoServer,
                disabled: fieldsDisabled || !draft.vivadoEnabled, spellCheck: false, autoComplete: 'off',
                placeholder: '/opt/amd/vivado-mcp-server',
                'aria-invalid': errorField === 'vivadoServer' ? true : undefined,
                'aria-describedby': 'ars-vivado-server-hint ars-status',
                onChange: (event) => { edit('vivadoServer', event.target.value) },
              }),
              h('p', { id: 'ars-vivado-server-hint', className: 'ars-hint' }, translate('vivadoServerHint'))),
            h('div', { className: 'ars-field' },
              h('label', { className: 'ars-label', htmlFor: 'ars-vivado-path' }, translate('vivadoPath')),
              h('input', {
                id: 'ars-vivado-path', className: 'ars-input', type: 'text', value: draft.vivadoPath,
                disabled: fieldsDisabled || !draft.vivadoEnabled, spellCheck: false, autoComplete: 'off',
                placeholder: '/tools/Xilinx/Vivado/2026.1/bin/vivado',
                'aria-describedby': 'ars-vivado-path-hint',
                onChange: (event) => { edit('vivadoPath', event.target.value) },
              }),
              h('p', { id: 'ars-vivado-path-hint', className: 'ars-hint' }, translate('vivadoPathHint'))),
            h('p', { className: 'ars-hint' }, translate('vivadoArgsHint'))),
          h('section', { key: 'doc', className: 'ars-block' },
            h('div', { className: 'ars-head' },
              h('h3', { className: 'ars-title' }, translate('docTitle')),
              h('label', { className: 'ars-toggle' },
                h('input', {
                  type: 'checkbox', checked: draft.docEnabled, disabled: fieldsDisabled,
                  onChange: (event) => { toggleDoc(event.target.checked) },
                }),
                translate('docEnable'))),
            docMismatch
              ? h('p', { className: 'ars-hint ars-warn' }, translate('transportMismatch', { name: DOC_SERVER, transport: String(docEntry.transport), expected: 'streamable-http' }))
              : draft.docEnabled ? null : h('p', { className: 'ars-hint' }, translate('enableFirst')),
            h('div', { className: 'ars-field' },
              h('label', { className: 'ars-label', htmlFor: 'ars-doc-url' }, translate('docUrl')),
              h('input', {
                id: 'ars-doc-url', ref: docUrlInput, className: 'ars-input', type: 'text', value: draft.docUrl,
                disabled: fieldsDisabled || !draft.docEnabled, spellCheck: false, autoComplete: 'off',
                placeholder: HOSTED_DOC_URL,
                'aria-invalid': errorField === 'docUrl' ? true : undefined,
                'aria-describedby': 'ars-doc-url-hint ars-doc-privacy ars-status',
                onChange: (event) => { edit('docUrl', event.target.value) },
              }),
              h('p', { id: 'ars-doc-url-hint', className: 'ars-hint' }, translate('docUrlHint')),
              h('p', { id: 'ars-doc-privacy', className: 'ars-hint' }, translate('docPrivacy')))),
          h('div', { key: 'actions', className: 'ars-actions' },
            h('button', {
              type: 'button', className: 'ars-button ars-primary',
              disabled: !writable,
              'aria-disabled': saving || !dirty || undefined,
              onClick: () => {
                if (saving) return
                if (!dirty) {
                  setStatus({ kind: 'idle', text: translate('noChanges') })
                  return
                }
                void save()
              },
            }, saving ? translate('saving') : translate('save')),
            h('button', {
              type: 'button', className: 'ars-button',
              disabled: !writable,
              'aria-disabled': saving || !dirty || undefined,
              onClick: () => { if (!saving) discard() },
            }, translate('discard')),
            h('p', { id: 'ars-status', className: statusClass, 'aria-live': 'polite' }, status.text)),
          writable ? null : h('div', { key: 'readonly', className: 'ars-note' }, translate('notWritable')),
        ])
      }

      ctx.effect(() => ctx.slots.inject('settings.section', () => ctx.slots.register({
        name: 'settings.section', id: 'amd-ross', order: 30, label: () => t('nav'), locale: NS,
      }, SettingsPage)), 'amd-ross: settings section')
    }

    return {
      inject: ['slots', 'locale', 'configForms'],
      apply,
    }
  },
})
