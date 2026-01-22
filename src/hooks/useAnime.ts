import { useEffect, useRef } from 'react'
import { animate } from 'animejs'
import type { AnimationParams } from 'animejs'

export function useAnime<T extends HTMLElement>(params: AnimationParams, deps: any[] = []) {
    const ref = useRef<T>(null)

    useEffect(() => {
        if (!ref.current) return

        const animation = animate(ref.current as HTMLElement, params)

        return () => {
            animation.pause() // or revert() depend on need, v4 has revert()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, ...deps])

    return ref
}

export function useStaggeredAnime<T extends HTMLElement>(
    selector: string,
    params: AnimationParams,
    deps: any[] = []
) {
    const containerRef = useRef<T>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const targets = containerRef.current.querySelectorAll(selector)
        if (targets.length === 0) return

        // v4 animate takes targets as first arg
        const animation = animate(targets, params)

        return () => {
            animation.pause()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selector, params, ...deps])

    return containerRef
}
