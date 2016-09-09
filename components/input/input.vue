/*
* @Author slashhunag
* 输入框组件
* @props
* hint: 提示框
*/

<style lang="sass" scoped>
    @import "./input.scss";
</style>
<template>
    <div class="c-input">
        <i>{{hint}}</i>
         <label>
           <slot name='input'></slot>
           <slot name='indicator'></slot>
        </label>
    </div>
</template>
<script type="text/babel">
    export default {
        props: ['hint']
    }
</script>