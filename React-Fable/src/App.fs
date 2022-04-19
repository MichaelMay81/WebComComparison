module App

open Browser.Dom
open Fable.Core
open Feliz
open Board

let [<Global("calculateWinner")>] calculateWinner(squares: string []): string option = jsNative

[<ReactComponent>]
let Game() =
    let (history, setHistory) = React.useState([ {| Squares = List.replicate 9 "" |} ])
    let (xIsNext, setXisNext) = React.useState(true)
    let (stepNumber, setStepNumber) = React.useState(0)

    let handleClick i =
        let history =
            history
            |> List.rev
            |> List.take (stepNumber+1)
            |> List.rev
        let current =
            history
            |> List.head
        let winner = calculateWinner(current.Squares |> List.toArray)

        match winner, (current.Squares |> List.item i) with
        | None, "" ->
            let squares =
                current.Squares
                |> List.updateAt i (if xIsNext then "X" else "O")
            setHistory ({| Squares = squares |} :: history)
            setXisNext (not xIsNext)
            setStepNumber (stepNumber + 1)
        | _, _ -> ()

    let jumpTo step =
        setStepNumber step
        setXisNext ((step % 2) = 0)

    let moves =
        history
        |> List.mapi (
            fun i _ -> 
                let desc =
                    match i with
                    | 0 -> "Go to game start"
                    | _ -> $"Go to move #{i}"
                Html.li [
                    prop.children [
                        Html.button [
                            prop.onClick (fun _ -> jumpTo(i))
                            prop.children [
                                Html.text desc ]]]] )

    let current =
        history
        |> List.rev
        |> List.item stepNumber
    let winner = calculateWinner(current.Squares |> List.toArray)

    let status =
        match winner with
        | Some winner ->
            $"Winner: {winner}"
        | None ->
            $"""Next player: {if xIsNext then "X" else "O"}"""

    Html.div [
        prop.className "game"
        prop.children [
            Html.div [
                prop.className "game-board"
                prop.children [
                    Board current.Squares handleClick ]]
            Html.div [
                prop.className "game-info"
                prop.children [
                    Html.div [ Html.text status ]
                    Html.ol [ prop.children moves ]]]]]

ReactDOM.render(Game(), document.getElementById "root")