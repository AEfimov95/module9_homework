'use strict'

const parser = new DOMParser();

const xmlString =`
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const list = xmlDOM.querySelector('list');
console.log(list)
const students = list.querySelectorAll('student');
let result = {
    list:[]
};
students.forEach(item=>{
    result.list.push(
        {
            name: item.querySelector('first').textContent+' '+item.querySelector('second').textContent,
            age: item.querySelector('age').textContent,
            prof: item.querySelector('prof').textContent,
            lang: item.querySelector('name').getAttribute('lang')
        }
    )
})
console.dir(obj)