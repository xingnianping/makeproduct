<template>
	<transition name="dialog-fade">
		<div class="st-dialog__wrapper" v-show="visible">
			<div
				class="st-dialog"
				:class="[{ 'is-fullscreen': fullscreen, 'st-dialog--center': center }, customClass]"
				ref="dialog"
				:style="style">
				<div class="st-dialog__header">
					<slot name="title">
            <span class="st-dialog__title">{{ title }}</span>
          </slot>
					<button
            type="button"
            class="st-dialog__headerbtn"
            aria-label="Close"
            v-if="showClose"
            @click="handleClose">
            <i class="st-dialog__close el-icon-close"></i>
          </button>
				</div>
				<div class="st-dialog__body" v-if="rendered"><slot></slot></div>
				<div class="st-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
			</div>
			<div class="st-mask" v-if="mask" @click="handleClose"></div>
		</div>
	</transition>
</template>

<script>
export default {
  name: 'st-notification',
  data() {
    return {
			closed: false,
			rendered: false
    }
	},
	
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		modal: {
			type: Boolean,
			default: true
		},
		showClose: {
			type: Boolean,
			default: true
		},
		fullscreen: Boolean,
		customClass: {
			type: String,
			default: ''
		},
		center: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '50%'
		},
		top: {
			type: String,
			default: '50px'
		},
		mask: {
			type: Boolean,
			default: true
		}
	},

	methods: {
		handleClose() {
			this.hide();
		},
		hide(cancel) {
			if (cancel !== false) {
				this.$emit('update:visible', false);
				this.$emit('close');
				this.closed = true;
			}
		}
	},

	watch: {
		visible(val) {
			if(val) {
				this.closed = false;
				this.$emit('open');
				this.rendered = true;
				setTimeout(() => {
					this.hide();
				}, 3000);
			}
		}
	},

	computed: {
		style() {
			let style = {};
			if (this.width) {
				style.width = this.width;
			}
			return style;
		}
	}
}
</script>

<style scoped>
.st-dialog {
    position: fixed;
    top:50%;
		left:50%;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-sizing: border-box;
		width: 50%;
		transform: translate(-50%,-50%);
		z-index: 999;
}

.st-dialog__wrapper {
	position:fixed;
	top:0;
	right:0;
	bottom:0;
	left:0;
	overflow:auto;
	margin:0;
	z-index: 3;
}
.st-dialog__header {
	padding:40px 50px 0;
}

.st-dialog__headerbtn {
	position:absolute;
	top:10px;
	right:10px;
	padding:0;
	background:0 0;
	border:none;
	outline:0;
	cursor:pointer;
}

.st-dialog__headerbtn .st-dialog__close {
	position: absolute;
	top: 0;
	right: 0;
	width: 38px;
	height: 38px;
	font-size: 32px;
	color: #969696;
	line-height: 38px;
	cursor: pointer;
	transition: .6s;
}

.st-dialog__headerbtn .st-dialog__close:hover {
	color: #388CF6;
}

.st-dialog__title {
	font-size:30px;
	color:#323232
}
.st-dialog__body {
	padding:0 50px;
	font-size:14px
}
.st-dialog__footer {
	padding:40px 50px;
	text-align:right;
	-webkit-box-sizing:border-box;
	box-sizing:border-box
}

.st-dialog--center .st-dialog__footer {
	text-align:center
}
.st-mask {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .6);
	z-index: 998;
}


.dialog-fade-enter-active {
    animation: dialog-fade-in .3s
}

.dialog-fade-leave-active {
    animation: dialog-fade-out .3s
}

@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
    to {
        transform: translateZ(0);
        opacity: 1
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translateZ(0);
        opacity: 1
    }
    to {
        transform: translate3d(0, -20px, 0);
        opacity: 0
    }
}

</style>

