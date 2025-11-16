/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 599.0, "series": [{"data": [[0.0, 10.0], [0.1, 10.0], [0.2, 10.0], [0.3, 10.0], [0.4, 10.0], [0.5, 10.0], [0.6, 10.0], [0.7, 10.0], [0.8, 10.0], [0.9, 10.0], [1.0, 17.0], [1.1, 17.0], [1.2, 17.0], [1.3, 17.0], [1.4, 17.0], [1.5, 17.0], [1.6, 17.0], [1.7, 17.0], [1.8, 17.0], [1.9, 17.0], [2.0, 19.0], [2.1, 19.0], [2.2, 19.0], [2.3, 19.0], [2.4, 19.0], [2.5, 19.0], [2.6, 19.0], [2.7, 19.0], [2.8, 19.0], [2.9, 19.0], [3.0, 19.0], [3.1, 19.0], [3.2, 19.0], [3.3, 19.0], [3.4, 19.0], [3.5, 19.0], [3.6, 19.0], [3.7, 19.0], [3.8, 19.0], [3.9, 19.0], [4.0, 21.0], [4.1, 21.0], [4.2, 21.0], [4.3, 21.0], [4.4, 21.0], [4.5, 21.0], [4.6, 21.0], [4.7, 21.0], [4.8, 21.0], [4.9, 21.0], [5.0, 21.0], [5.1, 21.0], [5.2, 21.0], [5.3, 21.0], [5.4, 21.0], [5.5, 21.0], [5.6, 21.0], [5.7, 21.0], [5.8, 21.0], [5.9, 21.0], [6.0, 24.0], [6.1, 24.0], [6.2, 24.0], [6.3, 24.0], [6.4, 24.0], [6.5, 24.0], [6.6, 24.0], [6.7, 24.0], [6.8, 24.0], [6.9, 24.0], [7.0, 25.0], [7.1, 25.0], [7.2, 25.0], [7.3, 25.0], [7.4, 25.0], [7.5, 25.0], [7.6, 25.0], [7.7, 25.0], [7.8, 25.0], [7.9, 25.0], [8.0, 31.0], [8.1, 31.0], [8.2, 31.0], [8.3, 31.0], [8.4, 31.0], [8.5, 31.0], [8.6, 31.0], [8.7, 31.0], [8.8, 31.0], [8.9, 31.0], [9.0, 35.0], [9.1, 35.0], [9.2, 35.0], [9.3, 35.0], [9.4, 35.0], [9.5, 35.0], [9.6, 35.0], [9.7, 35.0], [9.8, 35.0], [9.9, 35.0], [10.0, 40.0], [10.1, 40.0], [10.2, 40.0], [10.3, 40.0], [10.4, 40.0], [10.5, 40.0], [10.6, 40.0], [10.7, 40.0], [10.8, 40.0], [10.9, 40.0], [11.0, 50.0], [11.1, 50.0], [11.2, 50.0], [11.3, 50.0], [11.4, 50.0], [11.5, 50.0], [11.6, 50.0], [11.7, 50.0], [11.8, 50.0], [11.9, 50.0], [12.0, 50.0], [12.1, 50.0], [12.2, 50.0], [12.3, 50.0], [12.4, 50.0], [12.5, 50.0], [12.6, 50.0], [12.7, 50.0], [12.8, 50.0], [12.9, 50.0], [13.0, 52.0], [13.1, 52.0], [13.2, 52.0], [13.3, 52.0], [13.4, 52.0], [13.5, 52.0], [13.6, 52.0], [13.7, 52.0], [13.8, 52.0], [13.9, 52.0], [14.0, 55.0], [14.1, 55.0], [14.2, 55.0], [14.3, 55.0], [14.4, 55.0], [14.5, 55.0], [14.6, 55.0], [14.7, 55.0], [14.8, 55.0], [14.9, 55.0], [15.0, 55.0], [15.1, 55.0], [15.2, 55.0], [15.3, 55.0], [15.4, 55.0], [15.5, 55.0], [15.6, 55.0], [15.7, 55.0], [15.8, 55.0], [15.9, 55.0], [16.0, 61.0], [16.1, 61.0], [16.2, 61.0], [16.3, 61.0], [16.4, 61.0], [16.5, 61.0], [16.6, 61.0], [16.7, 61.0], [16.8, 61.0], [16.9, 61.0], [17.0, 61.0], [17.1, 61.0], [17.2, 61.0], [17.3, 61.0], [17.4, 61.0], [17.5, 61.0], [17.6, 61.0], [17.7, 61.0], [17.8, 61.0], [17.9, 61.0], [18.0, 70.0], [18.1, 70.0], [18.2, 70.0], [18.3, 70.0], [18.4, 70.0], [18.5, 70.0], [18.6, 70.0], [18.7, 70.0], [18.8, 70.0], [18.9, 70.0], [19.0, 80.0], [19.1, 80.0], [19.2, 80.0], [19.3, 80.0], [19.4, 80.0], [19.5, 80.0], [19.6, 80.0], [19.7, 80.0], [19.8, 80.0], [19.9, 80.0], [20.0, 86.0], [20.1, 86.0], [20.2, 86.0], [20.3, 86.0], [20.4, 86.0], [20.5, 86.0], [20.6, 86.0], [20.7, 86.0], [20.8, 86.0], [20.9, 86.0], [21.0, 88.0], [21.1, 88.0], [21.2, 88.0], [21.3, 88.0], [21.4, 88.0], [21.5, 88.0], [21.6, 88.0], [21.7, 88.0], [21.8, 88.0], [21.9, 88.0], [22.0, 88.0], [22.1, 88.0], [22.2, 88.0], [22.3, 88.0], [22.4, 88.0], [22.5, 88.0], [22.6, 88.0], [22.7, 88.0], [22.8, 88.0], [22.9, 88.0], [23.0, 92.0], [23.1, 92.0], [23.2, 92.0], [23.3, 92.0], [23.4, 92.0], [23.5, 92.0], [23.6, 92.0], [23.7, 92.0], [23.8, 92.0], [23.9, 92.0], [24.0, 98.0], [24.1, 98.0], [24.2, 98.0], [24.3, 98.0], [24.4, 98.0], [24.5, 98.0], [24.6, 98.0], [24.7, 98.0], [24.8, 98.0], [24.9, 98.0], [25.0, 98.0], [25.1, 98.0], [25.2, 98.0], [25.3, 98.0], [25.4, 98.0], [25.5, 98.0], [25.6, 98.0], [25.7, 98.0], [25.8, 98.0], [25.9, 98.0], [26.0, 107.0], [26.1, 107.0], [26.2, 107.0], [26.3, 107.0], [26.4, 107.0], [26.5, 107.0], [26.6, 107.0], [26.7, 107.0], [26.8, 107.0], [26.9, 107.0], [27.0, 113.0], [27.1, 113.0], [27.2, 113.0], [27.3, 113.0], [27.4, 113.0], [27.5, 113.0], [27.6, 113.0], [27.7, 113.0], [27.8, 113.0], [27.9, 113.0], [28.0, 115.0], [28.1, 115.0], [28.2, 115.0], [28.3, 115.0], [28.4, 115.0], [28.5, 115.0], [28.6, 115.0], [28.7, 115.0], [28.8, 115.0], [28.9, 115.0], [29.0, 116.0], [29.1, 116.0], [29.2, 116.0], [29.3, 116.0], [29.4, 116.0], [29.5, 116.0], [29.6, 116.0], [29.7, 116.0], [29.8, 116.0], [29.9, 116.0], [30.0, 126.0], [30.1, 126.0], [30.2, 126.0], [30.3, 126.0], [30.4, 126.0], [30.5, 126.0], [30.6, 126.0], [30.7, 126.0], [30.8, 126.0], [30.9, 126.0], [31.0, 127.0], [31.1, 127.0], [31.2, 127.0], [31.3, 127.0], [31.4, 127.0], [31.5, 127.0], [31.6, 127.0], [31.7, 127.0], [31.8, 127.0], [31.9, 127.0], [32.0, 134.0], [32.1, 134.0], [32.2, 134.0], [32.3, 134.0], [32.4, 134.0], [32.5, 134.0], [32.6, 134.0], [32.7, 134.0], [32.8, 134.0], [32.9, 134.0], [33.0, 134.0], [33.1, 134.0], [33.2, 134.0], [33.3, 134.0], [33.4, 134.0], [33.5, 134.0], [33.6, 134.0], [33.7, 134.0], [33.8, 134.0], [33.9, 134.0], [34.0, 136.0], [34.1, 136.0], [34.2, 136.0], [34.3, 136.0], [34.4, 136.0], [34.5, 136.0], [34.6, 136.0], [34.7, 136.0], [34.8, 136.0], [34.9, 136.0], [35.0, 138.0], [35.1, 138.0], [35.2, 138.0], [35.3, 138.0], [35.4, 138.0], [35.5, 138.0], [35.6, 138.0], [35.7, 138.0], [35.8, 138.0], [35.9, 138.0], [36.0, 138.0], [36.1, 138.0], [36.2, 138.0], [36.3, 138.0], [36.4, 138.0], [36.5, 138.0], [36.6, 138.0], [36.7, 138.0], [36.8, 138.0], [36.9, 138.0], [37.0, 141.0], [37.1, 141.0], [37.2, 141.0], [37.3, 141.0], [37.4, 141.0], [37.5, 141.0], [37.6, 141.0], [37.7, 141.0], [37.8, 141.0], [37.9, 141.0], [38.0, 151.0], [38.1, 151.0], [38.2, 151.0], [38.3, 151.0], [38.4, 151.0], [38.5, 151.0], [38.6, 151.0], [38.7, 151.0], [38.8, 151.0], [38.9, 151.0], [39.0, 152.0], [39.1, 152.0], [39.2, 152.0], [39.3, 152.0], [39.4, 152.0], [39.5, 152.0], [39.6, 152.0], [39.7, 152.0], [39.8, 152.0], [39.9, 152.0], [40.0, 153.0], [40.1, 153.0], [40.2, 153.0], [40.3, 153.0], [40.4, 153.0], [40.5, 153.0], [40.6, 153.0], [40.7, 153.0], [40.8, 153.0], [40.9, 153.0], [41.0, 174.0], [41.1, 174.0], [41.2, 174.0], [41.3, 174.0], [41.4, 174.0], [41.5, 174.0], [41.6, 174.0], [41.7, 174.0], [41.8, 174.0], [41.9, 174.0], [42.0, 183.0], [42.1, 183.0], [42.2, 183.0], [42.3, 183.0], [42.4, 183.0], [42.5, 183.0], [42.6, 183.0], [42.7, 183.0], [42.8, 183.0], [42.9, 183.0], [43.0, 184.0], [43.1, 184.0], [43.2, 184.0], [43.3, 184.0], [43.4, 184.0], [43.5, 184.0], [43.6, 184.0], [43.7, 184.0], [43.8, 184.0], [43.9, 184.0], [44.0, 196.0], [44.1, 196.0], [44.2, 196.0], [44.3, 196.0], [44.4, 196.0], [44.5, 196.0], [44.6, 196.0], [44.7, 196.0], [44.8, 196.0], [44.9, 196.0], [45.0, 200.0], [45.1, 200.0], [45.2, 200.0], [45.3, 200.0], [45.4, 200.0], [45.5, 200.0], [45.6, 200.0], [45.7, 200.0], [45.8, 200.0], [45.9, 200.0], [46.0, 216.0], [46.1, 216.0], [46.2, 216.0], [46.3, 216.0], [46.4, 216.0], [46.5, 216.0], [46.6, 216.0], [46.7, 216.0], [46.8, 216.0], [46.9, 216.0], [47.0, 218.0], [47.1, 218.0], [47.2, 218.0], [47.3, 218.0], [47.4, 218.0], [47.5, 218.0], [47.6, 218.0], [47.7, 218.0], [47.8, 218.0], [47.9, 218.0], [48.0, 238.0], [48.1, 238.0], [48.2, 238.0], [48.3, 238.0], [48.4, 238.0], [48.5, 238.0], [48.6, 238.0], [48.7, 238.0], [48.8, 238.0], [48.9, 238.0], [49.0, 284.0], [49.1, 284.0], [49.2, 284.0], [49.3, 284.0], [49.4, 284.0], [49.5, 284.0], [49.6, 284.0], [49.7, 284.0], [49.8, 284.0], [49.9, 284.0], [50.0, 285.0], [50.1, 285.0], [50.2, 285.0], [50.3, 285.0], [50.4, 285.0], [50.5, 285.0], [50.6, 285.0], [50.7, 285.0], [50.8, 285.0], [50.9, 285.0], [51.0, 290.0], [51.1, 290.0], [51.2, 290.0], [51.3, 290.0], [51.4, 290.0], [51.5, 290.0], [51.6, 290.0], [51.7, 290.0], [51.8, 290.0], [51.9, 290.0], [52.0, 294.0], [52.1, 294.0], [52.2, 294.0], [52.3, 294.0], [52.4, 294.0], [52.5, 294.0], [52.6, 294.0], [52.7, 294.0], [52.8, 294.0], [52.9, 294.0], [53.0, 297.0], [53.1, 297.0], [53.2, 297.0], [53.3, 297.0], [53.4, 297.0], [53.5, 297.0], [53.6, 297.0], [53.7, 297.0], [53.8, 297.0], [53.9, 297.0], [54.0, 316.0], [54.1, 316.0], [54.2, 316.0], [54.3, 316.0], [54.4, 316.0], [54.5, 316.0], [54.6, 316.0], [54.7, 316.0], [54.8, 316.0], [54.9, 316.0], [55.0, 340.0], [55.1, 340.0], [55.2, 340.0], [55.3, 340.0], [55.4, 340.0], [55.5, 340.0], [55.6, 340.0], [55.7, 340.0], [55.8, 340.0], [55.9, 340.0], [56.0, 341.0], [56.1, 341.0], [56.2, 341.0], [56.3, 341.0], [56.4, 341.0], [56.5, 341.0], [56.6, 341.0], [56.7, 341.0], [56.8, 341.0], [56.9, 341.0], [57.0, 342.0], [57.1, 342.0], [57.2, 342.0], [57.3, 342.0], [57.4, 342.0], [57.5, 342.0], [57.6, 342.0], [57.7, 342.0], [57.8, 342.0], [57.9, 342.0], [58.0, 350.0], [58.1, 350.0], [58.2, 350.0], [58.3, 350.0], [58.4, 350.0], [58.5, 350.0], [58.6, 350.0], [58.7, 350.0], [58.8, 350.0], [58.9, 350.0], [59.0, 360.0], [59.1, 360.0], [59.2, 360.0], [59.3, 360.0], [59.4, 360.0], [59.5, 360.0], [59.6, 360.0], [59.7, 360.0], [59.8, 360.0], [59.9, 360.0], [60.0, 364.0], [60.1, 364.0], [60.2, 364.0], [60.3, 364.0], [60.4, 364.0], [60.5, 364.0], [60.6, 364.0], [60.7, 364.0], [60.8, 364.0], [60.9, 364.0], [61.0, 365.0], [61.1, 365.0], [61.2, 365.0], [61.3, 365.0], [61.4, 365.0], [61.5, 365.0], [61.6, 365.0], [61.7, 365.0], [61.8, 365.0], [61.9, 365.0], [62.0, 370.0], [62.1, 370.0], [62.2, 370.0], [62.3, 370.0], [62.4, 370.0], [62.5, 370.0], [62.6, 370.0], [62.7, 370.0], [62.8, 370.0], [62.9, 370.0], [63.0, 376.0], [63.1, 376.0], [63.2, 376.0], [63.3, 376.0], [63.4, 376.0], [63.5, 376.0], [63.6, 376.0], [63.7, 376.0], [63.8, 376.0], [63.9, 376.0], [64.0, 376.0], [64.1, 376.0], [64.2, 376.0], [64.3, 376.0], [64.4, 376.0], [64.5, 376.0], [64.6, 376.0], [64.7, 376.0], [64.8, 376.0], [64.9, 376.0], [65.0, 380.0], [65.1, 380.0], [65.2, 380.0], [65.3, 380.0], [65.4, 380.0], [65.5, 380.0], [65.6, 380.0], [65.7, 380.0], [65.8, 380.0], [65.9, 380.0], [66.0, 386.0], [66.1, 386.0], [66.2, 386.0], [66.3, 386.0], [66.4, 386.0], [66.5, 386.0], [66.6, 386.0], [66.7, 386.0], [66.8, 386.0], [66.9, 386.0], [67.0, 390.0], [67.1, 390.0], [67.2, 390.0], [67.3, 390.0], [67.4, 390.0], [67.5, 390.0], [67.6, 390.0], [67.7, 390.0], [67.8, 390.0], [67.9, 390.0], [68.0, 398.0], [68.1, 398.0], [68.2, 398.0], [68.3, 398.0], [68.4, 398.0], [68.5, 398.0], [68.6, 398.0], [68.7, 398.0], [68.8, 398.0], [68.9, 398.0], [69.0, 411.0], [69.1, 411.0], [69.2, 411.0], [69.3, 411.0], [69.4, 411.0], [69.5, 411.0], [69.6, 411.0], [69.7, 411.0], [69.8, 411.0], [69.9, 411.0], [70.0, 411.0], [70.1, 411.0], [70.2, 411.0], [70.3, 411.0], [70.4, 411.0], [70.5, 411.0], [70.6, 411.0], [70.7, 411.0], [70.8, 411.0], [70.9, 411.0], [71.0, 412.0], [71.1, 412.0], [71.2, 412.0], [71.3, 412.0], [71.4, 412.0], [71.5, 412.0], [71.6, 412.0], [71.7, 412.0], [71.8, 412.0], [71.9, 412.0], [72.0, 415.0], [72.1, 415.0], [72.2, 415.0], [72.3, 415.0], [72.4, 415.0], [72.5, 415.0], [72.6, 415.0], [72.7, 415.0], [72.8, 415.0], [72.9, 415.0], [73.0, 415.0], [73.1, 415.0], [73.2, 415.0], [73.3, 415.0], [73.4, 415.0], [73.5, 415.0], [73.6, 415.0], [73.7, 415.0], [73.8, 415.0], [73.9, 415.0], [74.0, 416.0], [74.1, 416.0], [74.2, 416.0], [74.3, 416.0], [74.4, 416.0], [74.5, 416.0], [74.6, 416.0], [74.7, 416.0], [74.8, 416.0], [74.9, 416.0], [75.0, 424.0], [75.1, 424.0], [75.2, 424.0], [75.3, 424.0], [75.4, 424.0], [75.5, 424.0], [75.6, 424.0], [75.7, 424.0], [75.8, 424.0], [75.9, 424.0], [76.0, 425.0], [76.1, 425.0], [76.2, 425.0], [76.3, 425.0], [76.4, 425.0], [76.5, 425.0], [76.6, 425.0], [76.7, 425.0], [76.8, 425.0], [76.9, 425.0], [77.0, 441.0], [77.1, 441.0], [77.2, 441.0], [77.3, 441.0], [77.4, 441.0], [77.5, 441.0], [77.6, 441.0], [77.7, 441.0], [77.8, 441.0], [77.9, 441.0], [78.0, 444.0], [78.1, 444.0], [78.2, 444.0], [78.3, 444.0], [78.4, 444.0], [78.5, 444.0], [78.6, 444.0], [78.7, 444.0], [78.8, 444.0], [78.9, 444.0], [79.0, 445.0], [79.1, 445.0], [79.2, 445.0], [79.3, 445.0], [79.4, 445.0], [79.5, 445.0], [79.6, 445.0], [79.7, 445.0], [79.8, 445.0], [79.9, 445.0], [80.0, 446.0], [80.1, 446.0], [80.2, 446.0], [80.3, 446.0], [80.4, 446.0], [80.5, 446.0], [80.6, 446.0], [80.7, 446.0], [80.8, 446.0], [80.9, 446.0], [81.0, 447.0], [81.1, 447.0], [81.2, 447.0], [81.3, 447.0], [81.4, 447.0], [81.5, 447.0], [81.6, 447.0], [81.7, 447.0], [81.8, 447.0], [81.9, 447.0], [82.0, 455.0], [82.1, 455.0], [82.2, 455.0], [82.3, 455.0], [82.4, 455.0], [82.5, 455.0], [82.6, 455.0], [82.7, 455.0], [82.8, 455.0], [82.9, 455.0], [83.0, 461.0], [83.1, 461.0], [83.2, 461.0], [83.3, 461.0], [83.4, 461.0], [83.5, 461.0], [83.6, 461.0], [83.7, 461.0], [83.8, 461.0], [83.9, 461.0], [84.0, 464.0], [84.1, 464.0], [84.2, 464.0], [84.3, 464.0], [84.4, 464.0], [84.5, 464.0], [84.6, 464.0], [84.7, 464.0], [84.8, 464.0], [84.9, 464.0], [85.0, 467.0], [85.1, 467.0], [85.2, 467.0], [85.3, 467.0], [85.4, 467.0], [85.5, 467.0], [85.6, 467.0], [85.7, 467.0], [85.8, 467.0], [85.9, 467.0], [86.0, 480.0], [86.1, 480.0], [86.2, 480.0], [86.3, 480.0], [86.4, 480.0], [86.5, 480.0], [86.6, 480.0], [86.7, 480.0], [86.8, 480.0], [86.9, 480.0], [87.0, 480.0], [87.1, 480.0], [87.2, 480.0], [87.3, 480.0], [87.4, 480.0], [87.5, 480.0], [87.6, 480.0], [87.7, 480.0], [87.8, 480.0], [87.9, 480.0], [88.0, 483.0], [88.1, 483.0], [88.2, 483.0], [88.3, 483.0], [88.4, 483.0], [88.5, 483.0], [88.6, 483.0], [88.7, 483.0], [88.8, 483.0], [88.9, 483.0], [89.0, 493.0], [89.1, 493.0], [89.2, 493.0], [89.3, 493.0], [89.4, 493.0], [89.5, 493.0], [89.6, 493.0], [89.7, 493.0], [89.8, 493.0], [89.9, 493.0], [90.0, 495.0], [90.1, 495.0], [90.2, 495.0], [90.3, 495.0], [90.4, 495.0], [90.5, 495.0], [90.6, 495.0], [90.7, 495.0], [90.8, 495.0], [90.9, 495.0], [91.0, 496.0], [91.1, 496.0], [91.2, 496.0], [91.3, 496.0], [91.4, 496.0], [91.5, 496.0], [91.6, 496.0], [91.7, 496.0], [91.8, 496.0], [91.9, 496.0], [92.0, 498.0], [92.1, 498.0], [92.2, 498.0], [92.3, 498.0], [92.4, 498.0], [92.5, 498.0], [92.6, 498.0], [92.7, 498.0], [92.8, 498.0], [92.9, 498.0], [93.0, 501.0], [93.1, 501.0], [93.2, 501.0], [93.3, 501.0], [93.4, 501.0], [93.5, 501.0], [93.6, 501.0], [93.7, 501.0], [93.8, 501.0], [93.9, 501.0], [94.0, 520.0], [94.1, 520.0], [94.2, 520.0], [94.3, 520.0], [94.4, 520.0], [94.5, 520.0], [94.6, 520.0], [94.7, 520.0], [94.8, 520.0], [94.9, 520.0], [95.0, 520.0], [95.1, 520.0], [95.2, 520.0], [95.3, 520.0], [95.4, 520.0], [95.5, 520.0], [95.6, 520.0], [95.7, 520.0], [95.8, 520.0], [95.9, 520.0], [96.0, 527.0], [96.1, 527.0], [96.2, 527.0], [96.3, 527.0], [96.4, 527.0], [96.5, 527.0], [96.6, 527.0], [96.7, 527.0], [96.8, 527.0], [96.9, 527.0], [97.0, 527.0], [97.1, 527.0], [97.2, 527.0], [97.3, 527.0], [97.4, 527.0], [97.5, 527.0], [97.6, 527.0], [97.7, 527.0], [97.8, 527.0], [97.9, 527.0], [98.0, 529.0], [98.1, 529.0], [98.2, 529.0], [98.3, 529.0], [98.4, 529.0], [98.5, 529.0], [98.6, 529.0], [98.7, 529.0], [98.8, 529.0], [98.9, 529.0], [99.0, 599.0], [99.1, 599.0], [99.2, 599.0], [99.3, 599.0], [99.4, 599.0], [99.5, 599.0], [99.6, 599.0], [99.7, 599.0], [99.8, 599.0], [99.9, 599.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 7.0, "minX": 0.0, "maxY": 26.0, "series": [{"data": [[0.0, 26.0], [300.0, 15.0], [100.0, 19.0], [200.0, 9.0], [400.0, 24.0], [500.0, 7.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 500.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 7.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 93.0, "series": [{"data": [[0.0, 93.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 7.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 33.190000000000005, "minX": 1.76328642E12, "maxY": 33.190000000000005, "series": [{"data": [[1.76328642E12, 33.190000000000005]], "isOverall": false, "label": "Users", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76328642E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 14.5, "minX": 1.0, "maxY": 527.0, "series": [{"data": [[33.0, 498.0], [2.0, 21.0], [34.0, 283.0], [37.0, 487.75], [39.0, 266.0], [41.0, 423.5], [45.0, 411.0], [44.0, 316.0], [49.0, 435.0], [3.0, 21.0], [51.0, 445.0], [50.0, 387.2], [52.0, 360.0], [53.0, 340.0], [54.0, 275.0], [55.0, 414.3333333333333], [56.0, 232.66666666666666], [58.0, 376.0], [61.0, 151.0], [60.0, 209.5], [63.0, 291.8], [4.0, 37.0], [6.0, 31.666666666666668], [7.0, 60.0], [9.0, 129.33333333333334], [11.0, 92.0], [13.0, 220.0], [14.0, 464.0], [15.0, 126.0], [16.0, 76.2], [1.0, 14.5], [17.0, 96.0], [18.0, 325.5], [22.0, 527.0], [25.0, 473.6666666666667], [28.0, 200.0], [30.0, 304.0], [31.0, 261.3846153846154]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[33.190000000000005, 263.86999999999995]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 63.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 236.66666666666666, "minX": 1.76328642E12, "maxY": 428.3333333333333, "series": [{"data": [[1.76328642E12, 428.3333333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.76328642E12, 236.66666666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76328642E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 263.86999999999995, "minX": 1.76328642E12, "maxY": 263.86999999999995, "series": [{"data": [[1.76328642E12, 263.86999999999995]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76328642E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 263.43, "minX": 1.76328642E12, "maxY": 263.43, "series": [{"data": [[1.76328642E12, 263.43]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76328642E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 31.290000000000003, "minX": 1.76328642E12, "maxY": 31.290000000000003, "series": [{"data": [[1.76328642E12, 31.290000000000003]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76328642E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 10.0, "minX": 1.76328642E12, "maxY": 599.0, "series": [{"data": [[1.76328642E12, 599.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.76328642E12, 10.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.76328642E12, 494.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.76328642E12, 598.2999999999996]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.76328642E12, 284.5]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.76328642E12, 520.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76328642E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 284.5, "minX": 100.0, "maxY": 284.5, "series": [{"data": [[100.0, 284.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 284.5, "minX": 100.0, "maxY": 284.5, "series": [{"data": [[100.0, 284.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 100.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.76328642E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.76328642E12, 1.6666666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76328642E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.76328642E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.76328642E12, 1.6666666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.76328642E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.76328642E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.76328642E12, 1.6666666666666667]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76328642E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 1.6666666666666667, "minX": 1.76328642E12, "maxY": 1.6666666666666667, "series": [{"data": [[1.76328642E12, 1.6666666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.76328642E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 10800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

