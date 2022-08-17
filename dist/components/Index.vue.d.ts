declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{}>> & {
        onScrollBottomHandler?: ((...args: any[]) => any) | undefined;
    }>>;
    emits: (event: "scrollBottomHandler", ...args: any[]) => void;
    data: {
        itemCount: number;
        startIdx: number;
        curScorllTop: number;
    };
    scrollRef: import("vue").Ref<any>;
    itemRef: import("vue").Ref<any>;
    showList: import("vue").ComputedRef<any>;
    endStart: import("vue").ComputedRef<number>;
    contentBlankHeight: import("vue").ComputedRef<{
        paddingTop: string;
        paddingBottom: string;
    }>;
    getItemLength: () => void;
    handlerScroll: () => Promise<void>;
    setDataStartIdx: () => Promise<void>;
    getStardIdx: () => number;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scrollBottomHandler"[], "scrollBottomHandler", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onScrollBottomHandler?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
