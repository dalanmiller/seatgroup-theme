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
        <div class="span12">
            <table id="map-tool" class="table table-bordered table-condensed">
                <thead>
                    <tr>
                        <th colspan=2></th>
                        <th class="semester" colspan=2>Summer</th>
                        <th class="semester" colspan=4>Fall to Winter</th>
                        <th class="semester" colspan=4>Winter to Spring</th>
                    </tr>
                    <tr>
                        <th>Student ID</th>
                        <th>Grade</th>
                        <!-- Summer -->
                        <th>Summer Learning %</th>
                        <th>
                            Percent chance of meeting
                            <br/>
                            3rd grade reading standards
                        </th>
                        <!-- Fall to Winter -->
                        <th>Actual Growth</th>
                        <th>Typical Growth</th>
                        <th>Rate of Growth</th>
                        <th>
                            Percent chance of meeting
                            <br/>
                            3rd grade reading standards
                        </th>

                        <!-- Winter to Spring -->
                        <th>Actual Growth</th>
                        <th>Typical Growth</th>
                        <th>Rate of Growth</th>
                        <th>
                            Percent chance of meeting
                            <br/>
                            3rd grade reading standards
                        </th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <!-- Student -->
                        <td>
                            <input class="input-small" type="text"></td>
                        <td>
                            <select id='grade' class="span2">
                                <option>K</option>
                                <option>1st</option>
                                <option>2nd</option>
                                <option>3rd</option>
                                <option>4th</option>
                            </select>
                        </td>
                        <!-- Summer -->
                        <td>
                            <input class="input-mini" type="text"></td>
                        <td></td>
                        <!-- Fall to Winter -->
                        <td id='act-gro-ftw'>
                            <input class="input-mini" type="text"></td>
                        <td id='typ-gro-ftw'>8.5</td> <!-- Typical Growth -->
                        <td id="rate-gro-ftw"></td>
                        <td></td>

                        <!-- Winter to Spring -->
                        <td id='act-gro-wts'>
                            <input class="input-mini" type="text"></td>
                        <td id='typ-gro-wts'>6.7</td> <!-- Typical Growth -->
                        <td id="rate-gro-wts"></td>
                        <td ></td>

                    </tr>
                </tbody>

            </table>
        </div>
    </div>
    <div class="row map-tool-buttons">
        <div class="span12">
            <select class="span1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <button id="add-student" class="btn btn-success"><i class="icon-plus icon-white"></i> Add student</button>

            <button id="export-data" class="btn btn-info pull-right"><i class="icon-download icon-white"></i> Export Data</button>
        </div>
    </div>
</div>