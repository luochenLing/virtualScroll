declare const llcVirtualScroll: import("./utils/with-install").SFCWithInstall<import("vue").DefineComponent<{
    dataSet: {
        type: import("vue").PropType<{
            title: string;
            name: string;
            time: string;
            imgUrl: string;
            address: string;
        }[]>;
        required: true;
    };
    scrollBottomHandler: {
        type: import("vue").PropType<() => void>;
    };
    loadOrEndDataToolTip: {
        type: import("vue").PropType<string | HTMLElement>;
        default: string;
    };
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        dataSet: {
            type: import("vue").PropType<{
                title: string;
                name: string;
                time: string;
                imgUrl: string;
                address: string;
            }[]>;
            required: true;
        };
        scrollBottomHandler: {
            type: import("vue").PropType<() => void>;
        };
        loadOrEndDataToolTip: {
            type: import("vue").PropType<string | HTMLElement>;
            default: string;
        };
    }>> & {
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
    showList: import("vue").ComputedRef<{
        title: string;
        name: string;
        time: string;
        imgUrl: string;
        address: string;
    }[]>;
    endStart: import("vue").ComputedRef<number>;
    contentBlankHeight: import("vue").ComputedRef<{
        paddingTop: string;
        paddingBottom: string;
    }>;
    getItemLength: () => void;
    handlerScroll: () => Promise<void>;
    setDataStartIdx: () => Promise<void>;
    getStardIdx: () => number;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "scrollBottomHandler"[], "scrollBottomHandler", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    dataSet: {
        type: import("vue").PropType<{
            title: string;
            name: string;
            time: string;
            imgUrl: string;
            address: string;
        }[]>;
        required: true;
    };
    scrollBottomHandler: {
        type: import("vue").PropType<() => void>;
    };
    loadOrEndDataToolTip: {
        type: import("vue").PropType<string | HTMLElement>;
        default: string;
    };
}>> & {
    onScrollBottomHandler?: ((...args: any[]) => any) | undefined;
}, {
    loadOrEndDataToolTip: string | HTMLElement;
}>>;
export { llcVirtualScroll };
