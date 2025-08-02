<div class="acp-page-container">
	<!-- IMPORT admin/partials/settings/header.tpl -->

	<div class="row m-0">
		<div id="spy-container" class="col-12 px-0 mb-4" tabindex="0">
			<div class="mb-3">
				<a href="{config.relative_path}/api/admin/plugins/heapdump/snapshot" class="btn btn-primary">Download Heapdump</a>
			</div>
			<div class="mb-3">
				<button class="btn btn-secondary mb-2" id="heapdump-gc-button" {{{ if !gcEnabled }}}disabled{{{ end }}}>Run Garbage Collection</button>
				{{{ if !gcEnabled }}}
					<p class="text-muted text-sm">Garbage collection is not enabled. Please set <code>expose-gc</code> in your config.json options.</p>
				{{{ end }}}
			</div>
			<div class="mb-3">
				<label>Max Memory Usage:</label>
				<div class="mb-3 text-bg-light text-sm border rounded p-2">
					<pre class="mb-0">{maxUsage}</pre>
				</div>
			</div>
			<div class="mb-3">
				<label>Memory Usage:</label>
				<div class="mb-3 text-bg-light text-sm border rounded p-2">
					<pre class="mb-0">{memoryUsage}</pre>
				</div>
			</div>
		</div>

		<!-- IMPORT admin/partials/settings/toc.tpl -->
	</div>
</div>
