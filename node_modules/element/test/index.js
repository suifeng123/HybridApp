var test = require("tape")

var element = require("../index")

test("should convert HTML to DOM elements", function (assert) {
    var el = element("<p>Hello</p>");
    assert.equal("P", el.nodeName);
    assert.equal("Hello", el.textContent);

    var els = element("<p>one</p><p>two</p><p>three</p>");
    assert.equal("one", els.childNodes[0].textContent);
    assert.equal("two", els.childNodes[1].textContent);
    assert.equal("three", els.childNodes[2].textContent);
    assert.end();
})

test("should return unique element each time", function (assert) {
    var el1 = element("<p>Hello<p>")
    var el2 = element("<p>Hello<p>")

    assert.notEqual(el1, el2)
    assert.end()
})

test("should support body tags", function (assert) {
    var el = element("<body></body>")
    assert.equal("BODY", el.nodeName);
    assert.end();
})

test("should support body tags wtesth classes", function (assert) {
    var el = element("<body class='page'></body>")
    assert.equal("BODY", el.nodeName);
    assert.equal("page", el.className);
    assert.end();
})

test("should support legend tags", function (assert) {
    var el = element("<legend>Hello</legend>")
    assert.equal("LEGEND", el.nodeName);
    assert.end();
})

test("should support table tags", function (assert) {
    var el = element("<table></table>")
    assert.equal("TABLE", el.nodeName);
    assert.end();
})

test("should support thead tags", function (assert) {
    var el = element("<thead></thead>")
    assert.equal("THEAD", el.nodeName);
    assert.end();
})

test("should support tbody tags", function (assert) {
    var el = element("<tbody></tbody>")
    assert.equal("TBODY", el.nodeName);
    assert.end();
})

test("should support tfoot tags", function (assert) {
    var el = element("<tfoot></tfoot>")
    assert.equal("TFOOT", el.nodeName);
    assert.end();
})

test("should support caption tags", function (assert) {
    var el = element("<caption></caption>")
    assert.equal("CAPTION", el.nodeName);
    assert.end();
})

test("should support col tags", function (assert) {
    var el = element("<col></col>")
    assert.equal("COL", el.nodeName);
    assert.end();
})

test("should support td tags", function (assert) {
    var el = element("<td></td>")
    assert.equal("TD", el.nodeName);
    assert.end();
})

test("should support th tags", function (assert) {
    var el = element("<th></th>")
    assert.equal("TH", el.nodeName);
    assert.end();
})

test("should support tr tags", function (assert) {
    var el = element("<tr></tr>")
    assert.equal("TR", el.nodeName);
    assert.end();
})

test("should support option tags", function (assert) {
    var el = element("<option></option>")
    assert.equal("OPTION", el.nodeName);
    assert.end();
})

test("should support optgroup tags", function (assert) {
    var el = element("<optgroup></optgroup>")
    assert.equal("OPTGROUP", el.nodeName);
    assert.end();
})

test("should not set parentElement", function(assert) {
    var el = element("<p>Hello</p>")
    assert.ok(!el.parentElement);
    assert.ok(!el.parentNode);
    assert.end();
})

test("supports unicode", function (assert) {
    var el = element("Hello &copy;")
    console.log("el?", el)
    assert.equal(el.data, "Hello ©")
    assert.ok(!el.tagName)

    assert.end()
})
