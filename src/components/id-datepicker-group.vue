<template>
    <div class="id-datepicker-group">
        <label>{{label}}</label>
        <div class="input-container">
            <div class="date-value" :class="{'empty': !value, 'dirty': !value && selfDirty}">{{ value || placeholder }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'idDatepickerGroup',
    data: function() {
        return {
            selfDirty: false
        }
    },
    props: ['label', 'value', 'placeholder']
}
</script>
<style scoped>
.id-datepicker-group {
    position: relative;
    background-color: #fff;
    padding: .32rem 0 .266667rem;
    border-bottom: 1px solid #eee;
    clear: both;
    overflow: hidden;
}

label{
    float: left;
    font-size: 0.373333rem;
    color: #333;
    margin-right: .266667rem;
    width: 1.866667rem;
}

.input-container {
    position: relative;
    float: left;
    height: .586667rem;
    width: 6.933333rem;
}

.date-value{
    font-size: .373333rem;
    color: #333;
}

.date-value.empty{
    color: #858585;
}

.date-value.dirty{
    color: #ff0000;
}
</style>