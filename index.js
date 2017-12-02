const scraper = require('cheerio');
var $ = scraper.load('');

module.exports.getAllCourses = function(html) {
    $ = scraper.load(html);
    var courseJSON = [];
    $('div.course').each(function(i, elem) {
        console.log('newElem');
        courseJSON.push({
            name: getCourseName(this),
            prof: getProfessor(this),
            num: getCourseNumber(this),
            dept: getDepartment(this),
            loc: getLocation(this),
            section: getSectionNumber(this),
            req: getRequirements(this),
            desc: getDescription(this),
            credits: getCredits(this)
        });
    });
    return courseJSON;
}

function getCourseName(course) {
    var fullTitle = $(course).find('h3.title').text();
    var sections = fullTitle.split(' ');
    var title = '';
    for(var i = 2; i < sections.length - 2; i++) {
        title = title.concat(sections[i] + ' ');
    }
    title = title.substring(0, title.length - 1);
    return title;
}

function getCourseNumber(course) {
    var numDept = $(course).find('span.coursenum').text();
    var num = numDept.split(' ')[1];
    return parseInt(num.substring(0, 3));
}

function getCredits(course) {
    var credits = $(course).find('span.credits').text();
    var num = credits.split(' ')[0];
    try {
        return parseInt(numCredits);
    } catch (e) {
        return 6;
    }
}

function getDepartment(course) {
    var numDept = $(course).find('span.coursenum').text();
    return numDept.split(' ')[0];
}

function getDescription(course) {
    var description = $(course).find('div.description').text().replace(/\s+/g,' ').trim();
    description = description.substring(getProfessor(course).length,
                                        description.length);
    if(description.length > 0 && description.substring(0, 1) === ' ') {
        description = description.substring(1, description.length);
    }
    return description;
}

function getProfessor(course) {
    return $(course).find('p.faculty').text().replace(/\s+/g,' ').trim();
}

function getLocation(course){
    return $(course).find('p.locations').text();
}

function getTimes(course) {
    //TODO: Write scraper for times
}

function getRequirements(course) {
    var requirements = [];
    $(course).find('div.codeList li').each(function(){
        requirements.push($(this).text());
    });
    return requirements;
}

function getSectionNumber(course) {
    var numDept = $(course).find('span.coursenum').text();
    var num = numDept.split(' ')[1];
    var section = num.split('\.')[1];
    return parseInt(section);
}
