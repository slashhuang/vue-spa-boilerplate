/*
 * @Author slashhunag
 * 提示框组件
 * @props
 * @Usage
 * - headMsg
 * - bodyMsg
 * - hintMsg
 * - buttons={
    n_cbk:取消回调，
    y_cbk:确认回调
    cancel:取消文案
    cancel:确认文案
 }
**/
<template>
  <div class='note-container'>
      <div class='note-mask'></div>
      <div class="note-wrapper" :class="positionClass">
      <div class="head" v-if='headMsg'>{{headMsg}}</div>
      <div class="body" v-if='bodyMsg'>{{bodyMsg}}</div>
      <div class="hints" v-if='hintMsg' @click="fadeNote()">{{hintMsg}}</div>
      <div class="buttons" v-if='!!buttons'>
          <div class='btn-cancel' @click="fadeNote(buttons['n_cbk'])">
            {{buttons['cancel']}}
          </div>
          <div class='sep'></div>
          <div class='btn-confirm' @click="fadeNote(buttons['y_cbk'])">
            {{buttons['confirm']}}
          </div>
      </div>
  </div>

</template>
<style lang="sass" scoped>
  @import './note.scss'
</style>
<script type="text/ecmascript-6" lang="babel">
  export default {
    methods:{
      fadeNote(cbk){
        this.$remove(()=>{
          this.$destroy();
        });
        if(cbk){
          setTimeout(()=>{
            cbk();
          },50)
        }
      }
    }
  };
</script>