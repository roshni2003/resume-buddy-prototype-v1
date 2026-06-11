import { useEffect, useState } from "react";

var MOBILE_QUERY = `(max-width: 767px)`;
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(void 0);
	useEffect(() => {
		const mql = window.matchMedia(MOBILE_QUERY);
		const onChange = (e) => {
			setIsMobile(e.matches);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(mql.matches);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
export { useIsMobile as t };
