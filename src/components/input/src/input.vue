<template>
  <div 
    class="st-input"
    :class="[
      'st-input--'+type,
      {
        'is-disabled': disabled,
        'is-round': round,
        'st-input-group': $slots.prepend || $slots.append,
        'st-input-group--append': $slots.append,
        'st-input-group--prepend': $slots.prepend,
        'st-input--prefix': prefixIcon,
        'st-input--suffix': suffixIcon
      },
      'st-input--size-'+size
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <input
      class="st-input__inner"
      ref="input"
      :type="type"
      :placeholder="placeholder"
      :value="currentValue"
      :disabled="disabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >

    <span class="st-input__suffix" v-if="suffixIcon || showClear">
      <span class="st-input__suffix-inner">
        <template v-if="!showClear">
          <i class="st-input__icon"
            v-if="suffixIcon"
            :class="suffixIcon">
          </i>
        </template>
        <i v-else
          class="st-input__icon st-icon-circle-close st-input__clear"
          @click="clear"
        ></i>
      </span>
    </span>

    <span class="st-input__prefix" v-if="prefixIcon">
      <i class="st-input__icon"
          v-if="prefixIcon"
          :class="prefixIcon">
      </i>
    </span>

    <div class="st-input-group__append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'st-input',
  data() {
    return {
      currentValue: this.value,
      hovering: false,
      focused: false
    }
  },
  props: {
    value: [String, Number],
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: 'default'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    disabled: Boolean,
    round: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    prefixIcon: String,
    suffixIcon: String,
    readonly: Boolean,
  },

  computed: {
    showClear() {
      return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
    }
  },

  watch: {
    'value'(val, oldValue) {
      this.setCurrentValue(val);
    }
  },

  methods: {
    focus() {
      (this.$refs.input || this.$refs.textarea).focus();
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
      console.log(this.currentValue);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    handleInput(event) {
      const value = event.target.value;
      this.$emit('input', value);
      this.setCurrentValue(value);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.currentValue = value;
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.setCurrentValue('');
      this.focus();
    }
  }
}
</script>

<style scoped>
  .st-input {
    position: relative;
    width: 100%;
    display: inline-block;
    font-size: 14px;
  }

  .st-input__inner {
    display: inline-block;
    width: 100%;
    height: 26px;
    background-color: #fff;
    padding: 0 10px;
    color: #000;
		border: 1px #dcdfe6 solid;
		border-radius: 2px;
    box-sizing: border-box;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    -webkit-appearance: none; /* 禁止webkit拼写错误提示 */
  }

  .st-input__inner:hover {
    border-color: #B2B2B2;
  }

  .st-input__inner::-webkit-input-placeholder {
    color: #858585;
  }

  .st-input__inner:focus {
    outline: none;
    border-color: #3488fa;
  }

  .st-input.is-round .st-input__inner {
    border-radius: 4px;
  }

  .st-input.is-disabled .st-input__inner {
    background-color: #f5f7fa;
    color: #c0c4cc;
    border-color: #e4e7ed;
    cursor: not-allowed;
  }

  .st-input__prefix,
  .st-input__suffix {
    position:absolute;
    top:0;
    transition: all .3s;
    height:100%;
    color:#c0c4cc;
    text-align:center
  }

  .st-input__suffix {
    right:5px;
    transition:all .3s;
    pointer-events:none
  }
  .st-input__suffix-inner {
    pointer-events:all
  }

  .st-input__icon {
    height:100%;
    width:25px;
    text-align:center;
    transition:all .3s;
    transition:all .3s;
    line-height:40px
  }
  .st-input__icon:after {
    content:'';
    height:100%;
    width:0;
    display:inline-block;
    vertical-align:middle
  }

  .st-input-group {
	line-height: normal;
	display: inline-table;
	width: 100%;
	border-collapse: separate
  }

  .st-input-group>.st-input__inner {
    vertical-align: middle;
		display: table-cell;
		border-right: none;
  }

  .st-input-group__append,
  .st-input-group__prepend {
	vertical-align: middle;
	display: table-cell;
	position: relative;
	padding: 0 20px;
	width: 1px;
	white-space: nowrap
}

.st-input-group__append:focus,.st-input-group__prepend:focus {
	outline: none
}

.st-input-group__append .st-button,.st-input-group__append .st-select,.st-input-group__prepend .st-button,.st-input-group__prepend .st-select {
	display: inline-block;
	margin: -10px -20px
}

.st-input-group__append div.st-select .st-input__inner,.st-input-group__append div.st-select:hover .st-input__inner,.st-input-group__prepend button.st-button,.st-input-group__prepend div.st-select .st-input__inner,.st-input-group__prepend div.st-select:hover .st-input__inner {
	border-color: transparent;
	background-color: transparent;
	color: inherit;
	border-top: 0;
	border-bottom: 0
}

.st-input-group__append .st-button-plain {
  background-color: #E3E8E7;
  font-size: 12px;
  color: #000;
  border: 1px solid #B2B2B2;
}

.st-input-group__append .st-button,.st-input-group__append .st-input,.st-input-group__prepend .st-button,.st-input-group__prepend .st-input {
	font-size: inherit;
	border-radius: 0 2px 2px 0;
}

.st-input-group__prepend {
	border-right: 0;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0
}

.st-input-group__append {
	border-left: 0
}

.st-input-group--prepend .st-input__inner,.st-input-group__append {
	border-top-left-radius: 0;
	border-bottom-left-radius: 0
}

.st-input__prefix {
	position: absolute;
	left: 5px;
	top: 0;
	color: #c0c4cc
}

.st-input--prefix .st-input__inner {
  padding-left: 30px;
}

</style>

