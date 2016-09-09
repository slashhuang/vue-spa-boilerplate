/*
 * @Author slashhuang
 * 完成开户  列表
 */
<style lang='sass' scoped>
     @import "./list.scss";
</style>
 <template>
    <div class="done-list">
        <em>{{title}}</em>
        <p>{{detail}}</p>
    </div>
</template>
<script type="text/babel">
     export default {
         props: ['title','detail']
     }
</script>>
