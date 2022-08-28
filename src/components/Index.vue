<script setup lang="ts">
import {
  computed,
  onActivated,
  onMounted,
  reactive,
  ref,
  watch,
  nextTick,
  defineProps,
  PropType,
  defineEmits,
} from "vue";

type IdataSet = {
  title: string;
  name: string;
  time: string;
  imgUrl: string;
  address: string;
}[];

defineOptions({
  name:'llc-virtual-scroll'
})

const props = defineProps({
  dataSet: {
    type: Array as PropType<IdataSet>,
    required: true,
  },
  scrollBottomHandler: {
    type: Function as PropType<() => void>,
  },
  loadOrEndDataToolTip: {
    type: Object as PropType<HTMLElement | string>,
    default: "正在努力加载中...",
  },
});

const emits = defineEmits(["scrollBottomHandler"]);

const data = reactive<{
  /**
   * 可放信息条数（计算出来的）
   */
  itemCount: number;
  /**
   * 开始的索引（计算出来的）
   */
  startIdx: number;
  /**
   * 当前滚动条到顶部的距离，要记录下来防止跳转后返回的时候不能回到当前位置
   */
  curScorllTop: number;
}>({
  itemCount: 0,
  startIdx: 0,
  curScorllTop: 0,
});

/**
 * 视口区域大小
 */
const scrollRef = ref();

/**
 * 单条记录的高度,有多个，所以要取第一个
 */
const itemRef = ref<any>();

onMounted(async () => {
  window.onresize = () => {
    getItemLength();
  };
});
//路由记录到使用keepalive的时候会触发这个生命钩子
onActivated(() => {
  nextTick(() => {
    scrollRef.value.scrollTop = data.curScorllTop;
  });
});

watch(
  () => [props.dataSet, itemRef.value],
  () => {
    getItemLength();
  }
);

/**
 * 区域内展示的数据集合
 */
const showList = computed(() => {
  let sIdx = getStardIdx();
  let ret = props.dataSet.slice(sIdx, endStart.value);
  return ret;
});

/**
 * 结束的位置
 */
const endStart = computed(() => {
  //当前一屏内容还要加上缓冲区一屏的内容所以要两个屏（itemCount）
  let endStart = data.startIdx + data.itemCount * 2;
  if (!props.dataSet[endStart]) {
    endStart = props.dataSet.length - 1;
  }
  return endStart;
});

/**
 * 容器的边距
 */
const contentBlankHeight = computed(() => {
  let sIdx = getStardIdx();
  let itemHeight = itemRef.value ? itemRef.value[0]?.offsetHeight : 100; //默认项的高度是100PX
  let bottomBlankHeight = (props.dataSet.length - endStart.value) * itemHeight;
  let topBlankHeight = itemHeight * sIdx; //滚动一个就加了一个的高度做空白填充
  return {
    paddingTop: `${topBlankHeight}px`,
    paddingBottom: `${bottomBlankHeight}px`,
  };
});

/**
 * 获取单个数据的高度
 */
const getItemLength = () => {
  let itemHeight = itemRef.value ? itemRef.value[0]?.offsetHeight : 100; //默认项的高度是100PX
  data.itemCount = ~~(scrollRef.value.offsetHeight / itemHeight) + 2; //默认项的高度是100PX，一共一页显示几个
};

/**
 * 滚动方法
 */
const handlerScroll = async () => {
  let fps = 30; //一秒的帧数，一般电脑流畅的话就要30帧，有的电脑只支持15帧
  let interval = 1000 / fps; //间隔多久调用滚动方法一次，按一秒算
  let then = Date.now();
  requestAnimationFrame(() => {
    let now = Date.now();
    setDataStartIdx();
    //时间对比，大于间隔时间的时候才会调用方法
    if (now - then >= interval) {
      then = now;
      //@ts-ignore
      requestAnimationFrame(arguments.callee);
    }
  });
};

/**
 * 滚动的时候改变开始索引从而加载数据
 */
const setDataStartIdx = async () => {
  data.curScorllTop = scrollRef.value.scrollTop;
  let currendIdx = ~~(
    scrollRef.value.scrollTop / itemRef.value[0]?.offsetHeight
  );

  //计算滚动到第几个的公式是滚动条到顶部的距离除以单个信息的高度
  if (currendIdx === data.startIdx) {
    return;
  }
  data.startIdx = currendIdx;
  if (data.startIdx + data.itemCount > props.dataSet.length - 1) {
    console.log("到底了");
    emits("scrollBottomHandler");
  }
};

/**
 * 得到缓冲区计算的startIdx
 */
const getStardIdx = () => {
  let startIdx = 0;
  if (data.startIdx <= data.itemCount) {
    //一屏没滚动完的时候不传入新的截取数据的开始索引
    startIdx = 0;
  } else {
    //滚动完一屏后开始加载下一屏，这时候从新计算开始索引要减去滚动的一屏的位置
    startIdx = data.startIdx - data.itemCount;
  }
  return startIdx;
};

</script>

<template>
  <article
    class="visual-scroll"
    ref="scrollRef"
    @scroll.passive="handlerScroll"
  >
    <div :style="contentBlankHeight">
      <span class="item" v-for="(item, idx) in showList" ref="itemRef" v-cloak>
        <slot name="item" :data="item"></slot>
      </span>
      <div v-if="props.dataSet.length > data.itemCount">
        <slot name="toolTip"></slot>
      </div>
    </div>
  </article>
</template>

<style scoped lang="less">
[v-cloak] {
  display: none !important;
  color: aquamarine;
}
.visual-scroll {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  .item {
    border-bottom: 1px solid #454545;
    padding: 10px;
    font-size: 16px;
    justify-content: space-between;
    width: 100%;
    display: flex;
  }
}
</style>
