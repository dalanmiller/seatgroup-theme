<?php
/*
Template Name: MAP Scores Tool
*/
?>

<div class="container">
    <div class="row">
        <div class="span12">
            <h2>MAP Scores Tool</h2>

            <h3>How to use this tool</h3>
            <p>
                Dragée applicake jujubes croissant jelly beans candy. Chocolate bar chupa chups jelly pastry cupcake. Jujubes sugar plum dragée. Carrot cake bonbon pie sweet muffin carrot cake candy canes lemon drops lemon drops.
            </p>
        </div>
    </div>
    <div class="row">
        <div class="span12" style="margin-bottom:45px;">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="#tool" data-toggle="tab">Tool</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="tab-pane active" id="tool">
                    <table id="map-tool" class="table table-bordered table-striped table-condensed">
                        <thead>
                            <tr>
                                <th colspan=3>
                                    <label type="select" class="select">
                                        School Year
                                        <select class="school-year span3">
                                            <option>Fall 2011 - Spring 2012</option>
                                            <option>Spring 2012 - Fall 2012</option>
                                            <option>Fall 2012 - Spring 2013</option>
                                            <option>Spring 2013 - Fall 2013</option>
                                            <option>Fall 2013 - Spring 2014</option>
                                        </select>
                                    </label>
                                    <label type="select" class="select">
                                        RIT Type
                                        <select class="rit-type wspan2">
                                            <option>Reading</option>
                                            <option>Math</option>
                                        </select>
                                    </label>

                                </th>
                                <th class="semester" colspan=1>Fall</th>
                                <th class="semester" colspan=4>Winter</th>
                                <th class="semester" colspan=4>Spring</th>
                            </tr>
                            <tr>
                                <th>Student</th>
                                <th>Grade</th>
                                <th>RIT Scores</th>

                                <!-- Summer -->
                                <th>Initial % Likelihood </th>


                                <!-- Fall to Winter -->
                                <th>Typical Growth</th>
                                <th>Actual Growth</th>
                                <th>Growth Rate</th>
                                <th class='plikelihood'>
                                    % likelihood of meeting
                                    <br/>
                                    3rd grade standards
                                </th>

                                <!-- Winter to Spring -->
                                <th>Typical Growth</th>
                                <th>Actual Growth</th>
                                <th>Growth Rate</th>
                                <th class='plikelihood'>
                                    % likelihood of meeting
                                    <br/>
                                    3rd grade standards
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <!-- Student -->
                                <td>
                                    <input class="input-small" type="text"></td>
                                <td>
                                    <select id='grade' class="span1">
                                        <option>K</option>
                                        <option>1st</option>
                                        <option>2nd</option>
                                        <option>3rd</option>
                                        <option>4th</option>
                                    </select>
                                </td>
                                <td>
                                    <div class="rit-scores controls controls-row">

                                        <input class="rit rit-fall span1" type="number" placeholder="Fall">
                                        <input class="rit rit-winter span1" type="number" placeholder="Winter">
                                        <input class="rit rit-spring span1" type="number" placeholder="Spring">
                                    </div>
                                </td>
                                <!-- Summer -->
                                <td class="initial-display">

                                </td>
                                <!-- Fall to Winter -->
                                <td id='typ-gro-ftw'>8.5</td>
                                <td id='act-gro-ftw'></td>
                                <!-- Typical Growth -->
                                <td id="rate-gro-ftw"></td>
                                <td id="likeli-ftw"></td>

                                <!-- Winter to Spring -->
                                <td id='typ-gro-wts'>6.7</td>
                                <td id='act-gro-wts'></td>
                                <!-- Typical Growth -->
                                <td id="rate-gro-wts"></td>
                                <td id="likeli-wts"></td>

                            </tr>
                        </tbody>

                    </table>
                    <div class="map-tool-buttons">
                        <select id="add-student-select" class="span1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <button id="add-student" class="btn btn-success"> <i class="icon-plus icon-white"></i>
                            Add student
                        </button>
                        <button id="remove-student" class="btn btn-danger"><i class="icon-minus icon-white"></i>
                            Remove Student
                        </button>
                        <button id="clear-table" class="btn btn-info"><i class="icon-remove-sign icon-white"></i>
                            Clear Table
                        </button>

                        <button id="export-data" class="btn btn-info pull-right"> <i class="icon-download icon-white"></i>
                            Export Data
                        </button>
                    </div>
                    <div id="map-tool-results">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Below Typical Growth*</th>
                                    <th>At Typical Growth</th>
                                    <th>Aspirational Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="row-title">Fall to Winter</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td class="row-title">Winter to Spring</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="row "></div>
</div>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="http://d3js.org/d3.v3.js"></script>
