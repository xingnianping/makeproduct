<template>
  <button 
    @click="handleClick"
    class="st-button"
    :disabled="disabled"
    :type="nativeType"
    :class="[
      type ? 'st-button-' + type : '',
      size ? 'st-button-'+size : '',
      {
        'is-disabled' : disabled,
        'is-round' : round,
        'is-block' : block,
				'is-border': border,
				'is-plain': plain
      }
    ]"
  >
  <span v-if="$slots.default" @click="handleInnerClick"><slot></slot></span>
  </button>
</template>

<script>
export default {
  name: "st-button",
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "default"
    },
    icon: {
      type: String,
      default: ""
    },
    nativeType: {
      type: String,
      default: "button"
    },
    disabled: Boolean,
    round: Boolean,
		block: Boolean,
		border: Boolean,
		plain: Boolean
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt);
    },
    handleInnerClick(evt) {
      if (this.disabled) {
        evt.stopPropagation();
      }
    }
  }
};
</script>

<style scoped>

.st-button {
	display: inline-block;
	background-color: #388CF6;
	font-size: 12px;
	color: #fff;
	line-height: 1;
	text-align: center;
	border-color: transparent;
	cursor: pointer;
	border-radius: 2px;
	white-space: nowrap;
	transition: .4s;
	user-select: none;
	outline: none;
	-webkit-appearance: none;
	-webkit-box-sizing: border-box;
					box-sizing: border-box;
}

.st-button:hover {
	background-color: rgb(86, 160, 252);
}

.st-button-gray,
.st-button-gray:hover {
		background-color: #F2F2F2;
		color: #323232;
}

.st-button-gray.is-border {
    border: 1px solid #D0D4D3;
}

.st-button-text {
		background-color: transparent;
		color: #646464;
}

.st-button-text:hover {
	background-color: transparent;
	color: #388CF6;
	text-decoration: underline;
}

.st-button-plain {
  background-color: #fff;
  color: #323232;
}

.st-button-plain:hover {
  background-color: #fff;
  color: #388CF6;
}

.st-button-plain.is-border {
  border: 1px solid #388CF6;
}

.st-button-s {
    width: 90px;
    height: 26px;
}

.st-button-ss {
    width: 68px;
    height: 26px;
}

.st-button-xs {
    width: 140px;
    height: 33px;
}

.st-button-m {
    width: 168px;
		height: 42px;
		font-size: 16px;
}

.st-button-xl {
    width: 302px;
		height: 42px;
		font-size: 16px;
}

.st-button-xxl {
    width: 194px;
		height: 62px;
		font-size: 18px;
}

.st-button.is-disabled,
.st-button.is-disabled:focus,
.st-button.is-disabled:hover {
  color: #fff;
  cursor: not-allowed;
  background-image: none;
  background-color: #e1e1e1;
  border: none;
}
</style>
