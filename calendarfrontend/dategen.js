function* dateGen(start, options){
  // if !start then new Date() i.e. now
  // make _start a copy of start, but at midnight
  // if options instanceof Date then loop while(< options)
  let days = options.days;
  let _start = new Date(start.valueOf());
  //??? _start.setHour(0)
  let current, until;
  while (days > 0) {
    days--;
    current = new Date(_start.valueOf());
    current.setDate(current.getDate() + 1);
    until = new Date(current.valueOf());
    until.setDate(until.getDate() + 1);
    _start = new Date(current.valueOf());
    yield {start: current, until: until, events: []};
  }
}



var d = new Date();
var dg = dateGen(d, {days: 365});
for(var d of dg) {
  console.log(JSON.stringify(d));
}
