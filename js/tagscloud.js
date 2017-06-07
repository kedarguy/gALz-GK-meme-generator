var tags = [
    { name: "Java", imgs: 11 },
    { name: "JavaScript", imgs: 14 },
    { name: "Nightwatch", imgs: 3, },
    { name: "PhantomJs", imgs: 3 },
    { name: "jasmine", imgs: 2 },
    { name: "qunit", imgs: 1 },
    { name: "HTML", imgs: 15 },
    { name: "PHP", imgs: 2 },
    { name: "CSS", imgs: 26 },
    { name: "Flash", imgs: 9 },
    { name: "Actionscript", imgs: 9 },
    { name: "Flex", imgs: 1 },
    { name: "Delphi", imgs: 3 },
    { name: "Apache", imgs: 3 }
]

/* global d3, _, tags */

var minimgs = _.min(_.map(tags, 'imgs'));
var maximgs = _.max(_.map(tags, 'imgs'));

var minfont = 18;
var maxfont = 35;

var width = 800;
var height = 200;

var fill = d3.scale.category20();

// for small screens (and slow cpu's) limit retries
var MAX_TRIES = (width > 400) ? 6 : 3;

// draw initial cloud wilthout filters
generateTagCloud();

function generateTagCloud(retryCycle) {
    var tagsToDraw = transformToCloudLayoutObjects(filterTags(tags), retryCycle);
    d3.layout.cloud()
        .size([width, height])
        .words(tagsToDraw)
        .rotate(function () {
            return (~~(Math.random() * 6) - 2.5) * 30;
        })
        .font("Impact")
        .fontSize(function (d) {
            return d.size;
        })
        .on("end", function (fittedTags) {
            // check if all words fit and are included
            if (fittedTags.length == tagsToDraw.length) {
                drawTagCloud(fittedTags); // finished
            }
            else if (!retryCycle || retryCycle < MAX_TRIES) {
                // words are missing due to the random placement and limited room space
                console.debug('retrying');
                // try again and start counting retries
                generateTagCloud((retryCycle || 1) + 1);
            }
            else {
                // retries maxed and failed to fit all the words
                console.debug('gave up :(');
                // just draw what we have
                drawTagCloud(fittedTags);
            }
        })
        .start();

    // filter tags based on user input and transform to
    function filterTags(tags) {
        var textfilter = document.getElementById('filter').value;
        return _.filter(tags, function (tag) {
            return !textfilter || tag.name.toLowerCase().indexOf(textfilter.toLowerCase()) >= 0;
        });
    }

    // convert tag objects into cloud layout objects
    function transformToCloudLayoutObjects(tags, retryCycle) {
        return _.map(tags, function (tag) {
            return {
                text: tag.name.toLowerCase(),
                size: toFontSize(tag.imgs, retryCycle)
            };
        });
    }

    /**
     * 1. Determine font size based on imgs of experience relative to the tags with the least and most imgs of experience.
     * 2. Further increase / decrease font size based on relevancy (linux 20y is could less relevant than java 3y, so relevancy 
     *    .2 vs 1.5 could work for example).
     */
    function toFontSize(imgs, retryCycle) {
        // translate imgs scale to font size scale and apply relevancy factor
        var lineairSize = (((imgs - minimgs) / (maximgs - minimgs)) * (maxfont - minfont)) + minfont;
        // make the difference between small sizes and bigger sizes more pronounced for effect
        var polarizedSize = Math.pow(lineairSize / 8, 3);
        // reduce the size as the retry cycles ramp up (due to too many words in too small space)
        var reduceSize = polarizedSize * ((MAX_TRIES - retryCycle) / MAX_TRIES);
        return ~~reduceSize;
    }

    function drawTagCloud(words) {
        d3.select("#cloud svg").remove();
        d3.select("#cloud").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + ~~(width / 2) + "," + ~~(height / 2) + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("-webkit-touch-callout", "none")
            .style("-webkit-user-select", "none")
            .style("-khtml-user-select", "none")
            .style("-moz-user-select", "none")
            .style("-ms-user-select", "none")
            .style("user-select", "none")
            .style("cursor", "default")
            .style("font-family", "Impact")
            .style("fill", function (d, i) {
                return fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });

        // set the viewbox to content bounding box (zooming in on the content, effectively trimming whitespace)
        var svg = document.getElementsByTagName("svg")[0];
        var bbox = svg.getBBox();
        var viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(" ");
        svg.setAttribute("viewBox", viewBox);
    }
}