<template>
  <div ref="wrapper">
    <!-- better-scroll挂载的节点必须只能有一个子节点 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
//导入better-scroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      bs: null,
    };
  },
  props: {
    //是否监听滚动
    probeType: {
      type: Number,
      default() {
        return 0;
      },
    },
    //是否监听下拉加载更多
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  mounted() {
    //创建better-scroll对象
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true,
      //0，1不监听，2只监听手指滑动，3还监听惯性移动
      probeType: this.probeType,
      //是否监听加载更多
      pullUpLoad: this.pullUpLoad,
    });

    //监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.bs.on("scroll", (position) => {
        //   console.log(position);
        //触发事件传递监听到的滚动事件
        this.$emit("scroll", position);
      });
    }

    //监听上拉更多事件
    if (this.pullUpLoad) {
      this.bs.on("pullingUp", () => {
        this.$emit("loadMore");
      });
    }
  },
  methods: {
    //设置滑动到指定坐标方法，默认300毫秒
    scrollTo(x, y, time = 300) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    //刷新重置下拉加载次数
    finishPullUp() {
      this.bs && this.bs.finishPullUp();
    },
    //刷新属性事件
    refresh() {
      // console.log("Scroll refresh");
      this.bs.refresh();
    },
    //得到y值
    getY() {
      return this.bs ? this.bs.y : 0;
    },
  },
};
</script>

<style scoped></style>
