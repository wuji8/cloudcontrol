package com.cloud.cc.vo.model;

public class Querys {
		
		private String field;
		public String getField() {
			return field;
		}
		public void setField(String field) {
			this.field = field;
		}
		public String getValtype() {
			return valtype;
		}
		public void setValtype(String valtype) {
			this.valtype = valtype;
		}
		public String getVal() {
			return val;
		}
		@Override
		public String toString() {
			return "Querys [field=" + field + ", valtype=" + valtype + ", val=" + val + ", symbol=" + symbol + "]";
		}
		public void setVal(String val) {
			this.val = val;
		}
		public String getSymbol() {
			return symbol;
		}
		public void setSymbol(String symbol) {
			this.symbol = symbol;
		}
		private String valtype;
		private String val;
		private String symbol;
}
