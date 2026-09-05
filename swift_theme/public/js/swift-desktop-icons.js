/* Tag native desk tiles by module family so CSS can quieten and vary them.
   Does not change the page theme — only the coloured squares. */

function family_for(label) {
	const key = (label || "").toLowerCase();
	if (/project|timesheet|task/.test(key)) return "projects";
	if (/customer|selling|sales order|crm/.test(key)) return "sales";
	if (/invoice|invoicing|accounting|tax|budget|payment|bank/.test(key)) return "finance";
	if (/employee|people|expense|payroll|recruit|hr|leave/.test(key)) return "hr";
	if (/todo|to-do|to do|calendar/.test(key)) return "tasks";
	if (/explore|insight|quality/.test(key)) return "explore";
	if (/stock|buying|purchase|asset|manufactur/.test(key)) return "ops";
	return "";
}

function tag_desktop_icons() {
	document.querySelectorAll(".desktop-icon[data-id]").forEach((el) => {
		const family = family_for(el.getAttribute("data-id"));
		if (family) el.setAttribute("data-family", family);
		else el.removeAttribute("data-family");
	});
}

function bind() {
	if (document.body.dataset.swiftDeskIcons === "1") return;
	document.body.dataset.swiftDeskIcons = "1";
	tag_desktop_icons();
	const mo = new MutationObserver(() => tag_desktop_icons());
	mo.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", bind);
} else {
	bind();
}
