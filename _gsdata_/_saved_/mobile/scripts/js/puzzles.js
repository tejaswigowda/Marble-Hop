var exercisesDict = [];
var noOfPuzzles = [1, 12, 12, 12, 12, 12, 12];
var exercisesCategories = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];


exercisesDict["0_1_MOVES"] = "44|46,45|46,65,55|46,65,57,56|46,57,56,45,55|46,57,56,45,75,65|46,57,45,75,65,54,55|46,45,75,65,54,55,37,47|46,45,75,65,54,37,47,57,56|46,45,75,54,37,47,57,56,63,64|46,45,54,37,47,57,56,63,64,55,65|46,45,54,37,47,57,56,64,55,65,43,53|46,45,54,37,47,57,56,64,55,65,43,73,63|46,45,54,37,47,57,56,64,55,65,43,63,75,74|46,45,54,37,47,57,56,64,55,65,63,75,74,41,42|46,45,54,37,47,57,56,64,55,65,75,74,41,42,43,53|46,45,54,37,47,57,56,64,55,65,75,74,41,42,43,73,63|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,63,23,33|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,23,33,43,53|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,23,33,43,51,52|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,23,33,51,52,63,53|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,23,51,52,63,53,31,32|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,32,43,33|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,32,43,13,23|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,34,33|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,33,14,24|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,24,35,34|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,24,35,32,33|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,35,32,33,44,34|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,32,33,44,34,15,25|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,32,33,44,15,25,36,35|46,45,54,37,47,57,56,64,55,65,75,74,41,42,73,51,52,63,53,31,43,13,23,14,32,33,15,25,36,35,24,34|"

exercisesDict["0_1_START"] = 0;
exercisesDict["0_1_END"] = 0;

if (localStorage.getItem("PUZ_PERF_0_1") == null){
        localStorage.setItem("PUZ_PERF_0_1", "puzzle_unplayed");
}
