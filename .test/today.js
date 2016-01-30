#!/usr/bin/env node

var
  child= require("child_process"),
  tape= require("tape"),
  week= require("..")

tape("Date utility reports same date", function(t){
	t.equals(Number.parseInt(week()), Number.parseInt(child.execSync("date +%U")))
	t.end()
})
