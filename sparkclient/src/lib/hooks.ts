import { useEffect } from "react";
import type { MutableRefObject } from "react";

export function useOnClickOutside(refs: MutableRefObject<HTMLElement|null>[], handler: Function) {
    useEffect(() => {  
        const listener = (event:MouseEvent|TouchEvent) => {
            // Do nothing if clicking ref's element or descendent elements
            let clickedOutside = true;
            const target = event.target as HTMLElement;
            refs.forEach(ref => {
                if (!ref.current || ref.current.contains(target)) {                    
                    clickedOutside = false;
                }
            });
            if (!clickedOutside) return;
            handler(event)
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
    [refs, handler]);
}