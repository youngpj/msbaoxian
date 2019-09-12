<template>
  <div class="date-picker-group">
    <div class="row">
      <label>{{label}}</label>
      <div class="input-container">
        <div class="check-container">
          <input type="checkbox" v-model="checked" @click="handleCheck" />
          <span> {{ checkVal }}</span>
        </div>
        <div class="value" :class="{'empty': !value, 'dirty': !value && selfDirty}" @click="openPicker" v-show="!(value == checkVal)">{{value ? new Date(value).getFullYear() + '-' + (new Date(value).getMonth() + 1) + '-' + new Date(value).getDate() : placeholder}}</div>
        <!-- <div class="ps-container" v-show="selfDirty ">
          <p class="ps" v-if="!value">*{{placeholder || '选项不能为空'}}</p>
        </div> -->
      </div>

      <mt-datetime-picker ref="picker" type="date" yearFormat="{value} 年" monthFormat="{value} 月" dateFormat="{value} 日" :startDate="startDate" :endDate="endDate" :value="pickerValue" @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <img src="../assets/image/jiantouxia.png" alt="" class="arrow-xia">
  </div>
</template>
<script>
// import datePicker from "vuejs-datepicker";
var nowDate = new Date();

export default {
  name: "datePickerGroup",
  data: function() {
    return {
      selfDirty: false,
      checked: (this.value == '长期'),
      checkVal: "长期",
      pickerValue: this.value ? new Date(this.value) : new Date(),
      startDate: new Date(this.option.startDate),
      endDate: this.option.endYear
        ? new Date(
            nowDate.getFullYear() +
              this.option.endYear +
              "/" +
              (nowDate.getMonth() + 1) +
              "/" +
              nowDate.getDate()
          )
        : new Date(this.option.endDate) // new Date((nowDate.getFullYear() + 20) + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate())
    };
  },
  props: ["value", "option", "label", "placeholder", "dirty"],
  mounted() {
    this.$refs.picker.$el.addEventListener('click', () => {
      if (!this.$refs.picker.visible) {
        document.getElementsByClassName('page')[0].style.pointerEvents = 'all';
      }
    });
  },
  methods: {
    openPicker() {
      this.selfDirty = true;
      this.$refs.picker.open();
      document.getElementsByClassName('page')[0].style.pointerEvents = 'none';

      setTimeout(() => {
        document.getElementsByClassName('v-modal')[0].addEventListener('click', () => {
          
          if (!this.$refs.picker.visible) {
            document.getElementsByClassName('page')[0].style.pointerEvents = 'all';
          }
        });
      }, 100)
    },
    handleConfirm(value) {
      this.$emit("input", value);
    },
    handleCheck() {}
  },
  components: {
    // DatetimePicker
  },
  watch: {
    value: function(v) {
      if (v == this.checkVal) {
        this.checked = true;
      } else {
        this.checked = false;
        this.pickerValue = new Date(v);
      }
      // this.selfDirty = true;
    },
    checked: function(v) {
      console.log(v);
      v ? this.$emit("input", this.checkVal) : this.$emit("input", "");
    },
    dirty: function(v) {
      if (v) this.selfDirty = true;
    }
  }
};
</script>
<style scoped>
.date-picker-group {
  position: relative;
  background-color: #fff;
  padding: 0.32rem 0 0.266667rem;
  border-bottom: 1px solid #eee;
  clear: both;
  overflow: hidden;
  pointer-events: all;
}
label {
  float: left;
  font-size: 0.373333rem;
  color: #333;
  margin-right: .266667rem;
  width: 1.866667rem;
}

.value {
  float: left;
  font-size: 0.373333rem;
  color: #333;
  line-height: 0.56rem;
}

.arrow-xia {
  position: absolute;
  top: 0.586667rem;
  right: 0.133333rem;
  transform: translateY(-50%);
  width: 0.373333rem;
}

input {
  position: relative;
  top: -0.026667rem;
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  border: none;
}

input::before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/checkbox-off.png");
  background-size: 100%;
}

input::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../assets/image/checkbox-on.png");
  background-size: 100%;
  opacity: 0;
}

input:checked::after {
  opacity: 1;
}

.check-container {
  position: relative;
  font-size: 0.373333rem;
  float: left;
  /* padding-top: .053333rem; */
  margin-right: 5px;
  /* padding-left: 2.48rem; */
  line-height: 0.56rem;
}

.empty {
  color: #858585;
}

.input-container {
  position: relative;
  float: left;
  height: 100%;
}

.ps-container {
  position: absolute;
  font-size: 0.32rem;
  color: #ff0000;
  bottom: -0.266667rem;
  /* transform: scale(.9); */
}

.dirty{
  color: #f00;
}
</style>