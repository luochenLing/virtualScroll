import { PropType } from "vue";
declare type IdataSet = {
    title: string;
    name: string;
    time: string;
    imgUrl: string;
    address: string;
}[];
declare const _sfc_main: import("vue").DefineComponent<{
    dataSet: {
        type: PropType<IdataSet>;
        required: true;
    };
    scrollBottomHandler: {
        type: PropType<() => void>;
    };
    loadOrEndDataToolTip: {
        type: PropType<string | HTMLElement>;
        default: string;
    };
}, {
    props: Readonly<import("@vue/shared").LooseRequired<Readonly<import("vue").ExtractPropTypes<{
        dataSet: {
            type: PropType<IdataSet>;
            required: true;
        };
        scrollBottomHandler: {
            type: PropType<() => void>;
        };
        loadOrEndDataToolTip: {
            type: PropType<string | HTMLElement>;
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
        type: PropType<IdataSet>;
        required: true;
    };
    scrollBottomHandler: {
        type: PropType<() => void>;
    };
    loadOrEndDataToolTip: {
        type: PropType<string | HTMLElement>;
        default: string;
    };
}>> & {
    onScrollBottomHandler?: ((...args: any[]) => any) | undefined;
}, {
    loadOrEndDataToolTip: string | HTMLElement;
}>;
export default _sfc_main;
