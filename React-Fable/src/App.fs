module App

open Browser.Dom
open Feliz

// // Mutable variable to count the number of times we clicked the button
// let mutable count = 0

// // Get a reference to our button and cast the Element to an HTMLButtonElement
// let myButton =
//     document.querySelector (".my-button") :?> Browser.Types.HTMLButtonElement

// // Register our listener
// myButton.onclick <-
//     fun _ ->
//         count <- count + 1
        // myButton.innerText <- sprintf "You clicked: %i time(s)" count

// [<ReactComponent>]
// let Counter() =
//     let (count, setCount) = React.useState(0)
//     Html.div [
//         Html.h1 count
//         Html.button [
//             prop.text "Increment"
//             prop.onClick (fun _ -> setCount(count + 1))
//         ]
//     ]

[<ReactComponent>]
let Square() = Html.button [ prop.className "square"]

[<ReactComponent>]
let Board() =
    let renderSquare (i) = Square ()
    let status = "Next player: X"

    Html.div [
        Html.div [
            prop.className "status"
            prop.children [ Html.text status ]
        ]
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare (0)
                renderSquare (1)
                renderSquare (2)
            ]
        ]
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare (3)
                renderSquare (4)
                renderSquare (5)
            ]
        ]
        Html.div [
            prop.className "board-row"
            prop.children [
                renderSquare (6)
                renderSquare (7)
                renderSquare (8)
            ]
        ]
    ]

[<ReactComponent>]
let Game() =
    Html.div [
        prop.className "game"
        prop.children [
            Html.div [
                prop.className "game-board"
                prop.children [ Board () ]
            ]
            Html.div [
                prop.className "game-info"
                prop.children [
                    Html.div [ Html.text "status" ]
                    Html.ol [ Html.text "TODO" ]
                ]
            ]
        ]
    ]

ReactDOM.render(Game(), document.getElementById "root")