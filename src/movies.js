// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
// function getAllDirectors(moviesArray) {
//     const result = []
//     directors = moviesArray.map(movie => movie.director).forEach((director, idx) => {
//         let exists = false
//        
//         if (idx === 0) {
//            exists = true
//            return
//         }
//        
//         for (let item of result) {
//            if (item === director) {
//                exists = true
//                return
//            }
//         }
//         if (!exists) {
//            result.push(director)
//         }
//     })
//     return result
// }
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director).filter((director, idx, self) => self.indexOf(director) === idx)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.filter(gnr => gnr == 'Drama').length).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    return moviesArray.length ? parseFloat((moviesArray.map(movie => movie.score).filter(Number).reduce((a, b) => a + b) / moviesArray.length).toFixed(2)) : 0
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaMovies = moviesArray.filter(movie => movie.genre.filter(gnr => gnr == 'Drama').length)
    return dramaMovies.length ? parseFloat((dramaMovies.map(movie => movie.score).filter(Number).reduce((a, b) => a + b) / dramaMovies.length).toFixed(2)) : 0
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    return moviesArray.map(
        movie => {
            if (movie.title != undefined) {
                return { title: movie.title, year: movie.year }
            }
            return { year: movie.year }
        })
        .sort((a, b) => a.title ? a.title.localeCompare(b.title) : 0)
        .sort((a, b) => a.year - b.year)
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map(movie => movie.title)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(movie => {
        mov = { ...movie }
        mov.duration = mov.duration.match(/\d+/g) // For the exercise words, but, if the duration is given in minutes only, will be incorrect!
        mov.duration = Number(mov.duration[0]) * 60 + (Number(mov.duration[1] || 0))
        return mov
    })
}

function bestYearAvg(moviesArray) {
    if (!moviesArray.length) {
        return null
    }
    const moviesByYear = {}
    moviesArray.map(
        movie => {
            return { year: movie.year, score: movie.score }
        })
        // Group by year
        .forEach(movie => {
            if (!moviesByYear[movie.year]) moviesByYear[movie.year] = []
            moviesByYear[movie.year].push(movie)
        })
    const avgMoviesByYear = []
    for (let entry of Object.entries(moviesByYear)) {
        if (entry[1].length === 1) {
            avgMoviesByYear.push(entry[1][0])
            continue
        }
        avgMoviesByYear.push({year: Number(entry[0]), score: entry[1].map(e => e.score).reduce((a,b) => a + b) / entry[1].length})
    }
    avgMoviesByYear.sort((a, b) => b.score - a.score)
  
    return `The best year was ${avgMoviesByYear[0].year} with an average score of ${avgMoviesByYear[0].score}`
}
