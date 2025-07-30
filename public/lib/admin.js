
'use strict';

define('admin/plugins/heapdump', ['alerts'], function (alerts) {
	var ACP = {};

	ACP.init = function () {
		$('#heapdump-gc-button').on('click', function () {
			console.log('Running garbage collection...');
			$.post(`${config.relative_path}/api/admin/plugins/heapdump/gc`, {
				_csrf: config.csrf_token,
			}).done(function (data) {
				if (data.ok) {
					alerts.alert({
						type: 'success',
						title: 'Garbage Collection',
						message: 'Garbage collection has been run successfully.',
					});
				} else {
					alerts.alert({
						type: 'danger',
						title: 'Garbage Collection Error',
						message: data.message || 'An error occurred while running garbage collection.',
					});
				}
			}).fail(function (xhr) {
				alerts.error(xhr.responseJSON.message);
			});
		});
	};

	return ACP;
});
