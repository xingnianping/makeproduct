<template>
    <div>
			<div style="margin-top: 100px;">
				<st-button size="s">按钮</st-button>
				<st-button size="ss">按钮</st-button>
				<st-button size="xs">按钮</st-button>
				<st-button size="m">按钮</st-button>
				<st-button size="xl">按钮</st-button>
				<st-button size="xxl">按钮</st-button>
			</div>

			<div style="margin-top: 100px;">
				<div style="width: 200px;"><st-input /></div>
				<div style="width: 300px;"><st-input ><st-button slot="append" class="st-button" type="ss">查询</st-button></st-input></div>
			</div>

			<div style="margin-top: 100px;">
				<st-button size="xs" @click="dialogVisible = true">点击打开对话框</st-button>
				<st-dialog title="提示" width="30%" :visible.sync="dialogVisible">
					<div>这是一段文字</div>
					<span slot="footer" class="dialog-footer">
						<st-button size="xs" type="gray" @click="dialogVisible = false" border>取 消</st-button>
						<st-button size="xs" @click="dialogVisible = false">确 定</st-button>
					</span>
				</st-dialog>
			</div>

			<div style="margin-top:100px;">
				<p>计数器</p>
				<div >
					<st-input-number :min="0" :max="60" @change-number="onChangeNumber" :id="'input-one'" :mintip="'请输入本次制作数量'" :maxtip="'已达到最大制作数量'"></st-input-number>
				</div>
				<div style="margin-top:30px;">
					<st-input-number :min="0" :max="20" @change-number="onChangeNumber" id="'input-two'"></st-input-number>
				</div>
			</div>

			<div>
				<st-loading>加载中</st-loading>
			</div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    onChangeNumber(newValue,inf) {
      console.log(newValue,inf.$attrs.id)
    }
  }
};
</script>
