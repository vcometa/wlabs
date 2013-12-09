rangeCSS = "@media all{
	.range-slider{
		position:relative;
		width:"+params.width+";
		height:"+params.height+";
		overflow:hidden
	}
	.range-slider .slider-bar{
		position:absolute;
		top:10px;
		left:0;
		background:"+params.barColor+";
		width:100%;
		height:"+params.barHeight+"
	}
	.range-slider .cover-left,.range-slider .cover-right{
		position:relative;
		margin:10px auto;
		float:left;
		z-index:1;
		background:#ccc;
		width:10px;
		height:10px
	}
	.range-slider .cover-right{
		float:right
	}
	.range-slider button{
		position:absolute;
		top:0;
		z-index:9;
		width:"+params.tabWidth+";
		height:"+params.tabHeight+";
		border:0;
		padding:0;
		margin:0;
		cursor:pointer;
		outline:0
	}
	.range-slider .left-handle{
		left:0;
		background:"+params.leftColor+"
	}
	.range-slider .right-handle{
		right:0;
		background:"+params.rightColor+"
	}

}
@media all and (max-width:767px){

	.range-slider button{
		width:44px;
		height:44px;
	}

}";
