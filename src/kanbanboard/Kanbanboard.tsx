import React, {useEffect, useState} from "react";
import "./Kanbanboard.css"
import {subscribeKanbanboard, UnsubscribeFn} from "./subscribeKanbanboard";
import {RouteComponentProps} from "react-router";
import Header from "../layout/Header";
import {useDispatch, useSelector} from "react-redux";
import {KanbanboardState, loadKanbanbaord, resetKanbanboard} from "./kanbanboardReducer";
import {addCard} from "./addCard";
import {addColumn} from "./addColumn";
import {Link} from "react-router-dom";
import {string} from "prop-types";
import Session from "../session/Session";

const Kanbanboard = (props: RouteComponentProps<{kanbanboardId: string}>) => {
  const {
    kanbanboardId,
  } = props.match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe: UnsubscribeFn = subscribeKanbanboard(kanbanboardId, (kanbanboard) => {
      dispatch(loadKanbanbaord(kanbanboard))
    });

    return () => {
      unsubscribe();
      dispatch(resetKanbanboard())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const kanbanboardState = useSelector<any, KanbanboardState>(state => state.kanbanboardReducer);

  const {
    kanbanboard
  } = kanbanboardState;

  if (!kanbanboard) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="kanbanboard">
      <Header/>
      <div className="kanbanboard-title">{kanbanboard.title}</div>
      {kanbanboard.columns.map((column, columnIndex) => {
        return (
          <div className="column" key={columnIndex}>
            <div className="column-title">
              {column.title}
            </div>

            {column.cards.map((card, cardIndex) => {
              return (
                <Link
                  className={"card-link"}
                  to={`/board/${kanbanboardId}/${columnIndex}/${cardIndex}`}
                  key={cardIndex}
                >
                  <div className="card">
                    <div>
                      {card.title}
                    </div>
                    <div className="card-score">
                      <img
                        width={12}
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjYiIGhlaWdodD0iMjYiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMzU0LDMuMzU0KSBzY2FsZSgwLjk2MSwwLjk2MSkiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGcgZmlsbD0iIzZiNzc4YyIgc3Ryb2tlPSIjNmI3NzhjIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxnIGlkPSJzdXJmYWNlMSAxIj48cGF0aCBkPSJNMTcwLjc1OTYyLDc2LjkwMzg1YzAsNDIuMTQ3MjQgLTM4LjQ1MTkyLDc1LjQ1NjczIC04NC43NTk2Miw3NS40NTY3M2MtNS4yNzE2MywwIC0xMC4zMTA3LC0wLjYyMDE5IC0xNS4yOTgwOCwtMS40NDcxMmMtNy4zNjQ3OCw1LjY4NTEgLTE2LjY5MzUxLDExLjU1MTA4IC0yNy43MDE5MiwxNS41MDQ4MWMtMTIuMjQ4NzksNC4zOTMwMyAtMjUuNjA4NzgsNi44NDc5NiAtMzguMDM4NDYsMy41MTQ0MmMtMi45MjAwNywtMC43NDk0IC00Ljk2MTU0LC0zLjM4NTIyIC00Ljk2MTU0LC02LjQwODY1YzAsLTUuMjE5OTUgMi45MjAwNywtOC45OTI3OSA1Ljc4ODQ2LC0xMS43ODM2NWMyLjg2ODM5LC0yLjc5MDg3IDYuMDIxMDMsLTUuMDM5MDYgOC44ODk0MiwtNy40NDIzMWM1LjMyMzMyLC00LjQ5NjM5IDkuMTczNjgsLTkuMDcwMzEgOS43MTYzNSwtMTYuNzQ1MTljLTEzLjg1MDk2LC0xMy4zODU4MSAtMjMuMTUzODUsLTMwLjgyODcyIC0yMy4xNTM4NSwtNTAuNjQ5MDRjMCwtNDIuMTczMDggMzguNDUxOTIsLTc1LjY2MzQ2IDg0Ljc1OTYyLC03NS42NjM0NmM0Ni4zMDc2OSwwIDg0Ljc1OTYyLDMzLjUxNjIyIDg0Ljc1OTYyLDc1LjY2MzQ2ek0xNC40NzExNSw3Ni45MDM4NWMwLDE3LjI2MjAyIDguMDYyNSwzMi44MTg1MSAyMS4yOTMyNyw0NC4yNDAzOGMxLjQ0NzEyLDEuMjQwMzggMi4yNzQwNCwzLjA0OTI4IDIuMjc0MDQsNC45NjE1NGMwLDEzLjY3MDA3IC04LjAxMDgxLDIyLjcxNDU0IC0xNC42Nzc4OCwyOC4zMjIxMmMtMS42NTM4NSwxLjM5NTQ0IC0yLjczOTE4LDIuMTk2NTEgLTQuMTM0NjIsMy4zMDc2OWM2LjIwMTkyLC0wLjI4NDI2IDEyLjg2ODk5LC0xLjM2OTU5IDE5LjQzMjY5LC0zLjcyMTE1YzEwLjY3MjQ3LC0zLjgyNDUyIDIwLjY5ODkyLC05Ljg3MTM5IDI2LjY2ODI3LC0xNC44ODQ2MmMxLjU3NjMyLC0xLjI0MDM4IDMuNjE3NzksLTEuNzA1NTMgNS41ODE3MywtMS4yNDAzOGM0LjkwOTg2LDAuOTMwMjkgOS44OTcyNCwxLjI0MDM4IDE1LjA5MTM1LDEuMjQwMzhjNDAuMDAyNCwwIDcxLjUyODg1LC0yOC4xNjcwNiA3MS41Mjg4NSwtNjIuMjI1OTZjMCwtMzQuMDU4ODkgLTMxLjUyNjQ0LC02Mi40MzI2OSAtNzEuNTI4ODUsLTYyLjQzMjY5Yy00MC4wMDI0LDAgLTcxLjUyODg1LDI4LjM3MzggLTcxLjUyODg1LDYyLjQzMjY5eiI+PC9wYXRoPjwvZz48L2c+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+PGcgZmlsbD0iIzZiNzc4YyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggZD0iTTg2LDEuMjQwMzhjLTQ2LjMwNzY5LDAgLTg0Ljc1OTYyLDMzLjQ5MDM4IC04NC43NTk2Miw3NS42NjM0NmMwLDE5LjgyMDMxIDkuMzAyODgsMzcuMjYzMjIgMjMuMTUzODUsNTAuNjQ5MDRjLTAuNTQyNjcsNy42NzQ4OCAtNC4zOTMwMywxMi4yNDg4IC05LjcxNjM1LDE2Ljc0NTE5Yy0yLjg2ODM5LDIuNDAzMjQgLTYuMDIxMDMsNC42NTE0NCAtOC44ODk0Miw3LjQ0MjMxYy0yLjg2ODM5LDIuNzkwODcgLTUuNzg4NDYsNi41NjM3MSAtNS43ODg0NiwxMS43ODM2NWMwLDMuMDIzNDQgMi4wNDE0Nyw1LjY1OTI2IDQuOTYxNTQsNi40MDg2NWMxMi40Mjk2OSwzLjMzMzUzIDI1Ljc4OTY3LDAuODc4NjEgMzguMDM4NDYsLTMuNTE0NDJjMTEuMDA4NDIsLTMuOTUzNzIgMjAuMzM3MTQsLTkuODE5NzEgMjcuNzAxOTIsLTE1LjUwNDgxYzQuOTg3MzgsMC44MjY5MiAxMC4wMjY0NCwxLjQ0NzEyIDE1LjI5ODA4LDEuNDQ3MTJjNDYuMzA3NjksMCA4NC43NTk2MiwtMzMuMzA5NDkgODQuNzU5NjIsLTc1LjQ1NjczYzAsLTQyLjE0NzI0IC0zOC40NTE5MiwtNzUuNjYzNDYgLTg0Ljc1OTYyLC03NS42NjM0NnpNODYsMTQuNDcxMTVjNDAuMDAyNCwwIDcxLjUyODg1LDI4LjM3MzggNzEuNTI4ODUsNjIuNDMyNjljMCwzNC4wNTg5IC0zMS41MjY0NCw2Mi4yMjU5NiAtNzEuNTI4ODUsNjIuMjI1OTZjLTUuMTk0MTEsMCAtMTAuMTgxNDksLTAuMzEwMSAtMTUuMDkxMzUsLTEuMjQwMzhjLTEuOTYzOTQsLTAuNDY1MTQgLTQuMDA1NDEsMCAtNS41ODE3MywxLjI0MDM4Yy01Ljk2OTM1LDUuMDEzMjIgLTE1Ljk5NTc5LDExLjA2MDEgLTI2LjY2ODI3LDE0Ljg4NDYyYy02LjU2MzcsMi4zNTE1NiAtMTMuMjMwNzcsMy40MzY5IC0xOS40MzI2OSwzLjcyMTE1YzEuMzk1NDQsLTEuMTExMTggMi40ODA3NywtMS45MTIyNiA0LjEzNDYyLC0zLjMwNzY5YzYuNjY3MDcsLTUuNjA3NTcgMTQuNjc3ODgsLTE0LjY1MjA0IDE0LjY3Nzg4LC0yOC4zMjIxMmMwLC0xLjkxMjI2IC0wLjgyNjkyLC0zLjcyMTE1IC0yLjI3NDA0LC00Ljk2MTU0Yy0xMy4yMzA3NywtMTEuNDIxODcgLTIxLjI5MzI3LC0yNi45NzgzNyAtMjEuMjkzMjcsLTQ0LjI0MDM4YzAsLTM0LjA1ODg5IDMxLjUyNjQ0LC02Mi40MzI2OSA3MS41Mjg4NSwtNjIuNDMyNjl6Ij48L3BhdGg+PC9nPjwvZz48cGF0aCBkPSIiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48L3BhdGg+PHBhdGggZD0iIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                        alt="comment icon"
                      />
                      <span className="card-score-num">
                        {card.comments.length}
                      </span>

                      <img
                        width={12}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACkwAAApMBv+Bu1wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATTSURBVFiFrZZdjFNFFMf/Z8pmoZjVNSLxRTcaBRMfNpioEVATQQGDHzESISsCJujetsvutr23LKJVVHp7b2Fh24KgSHwAkQDBN0ESVBBjQHwwakjkwZiI+yAJsOxq987xoXPv3t60Zb/mpXPmnJnff87MPVPCJLZYbHujE/73KWIxF+BmgC4zydPXpw0c35tOD1WbQ5MF1wxrKRH1gXFXFcwfINlZyCSPBD2hSYGn7C4C7QHQXCPkZoCWPTzv6YEfTh/7zu8QE4VHDVsnxha11iCADSEp7+u/eOcUJnEviFMABgAQg7MRw3rOP39CRxBJWQaYMsq8QkIuyW/WTwfj2vXcI4JwAuAwgIszpl2blU6nh4EJZEAz7JQfDsGLqsEBYEc2/j3ApjLv/nugaa7rG5eAiGH3ELDZDy9sTp6pO0nQZ1435Dw0bgFRPbcBwPu14Foy21pt3qAz/JdPjXdZxyQgYthvMvF7LpxBi/3wqJFrIyHOaoZtBueGqaHFM6TsH7MATc9tBLDJDy+ace+Tiuj2KwzeCyBEQOcbPdYD/vkMXuP1BXl3ZVQCIob9FhG/q8yr1eAgfIJyXfmPmF7a+UHyZ0+8YS0FOKbMn4qZ+NlRC9D03NsA3vHBF/nhmpFb6YcDvCyfjX/h+tsN6xkCHVT+YQZiAPGoBERTVpqI0y6chAzu/FUCV8ALZvKoHy5AhwA0AmCAOopm4pSfUbMQRQwrB1C3Mv8RRAv6MvHzI/5cBOA+tcYQAc/nzcSXnj9lvQCmAwAaAEhiXpvPJj8OcqpmoJx2D36VhHzWD9dSuVUAb1fwEohXVMDX55aAab+CM5i7qsGrZiCqW6uZaI+7c0i5sGDpP46Is6JE5MLHvfOqAtb2bL2jwXEuALgJwBADC/1nFknl1oB5N8qZKzHj5WI2cbhi55IPQ505AV15M7GtFhwIHEGD42xQcDDodT88qluvTTa8QsCqdHoqgFUo088UzfinPvhqJtpVCx417MX14Ot6emfeUEB4qOkJANPLo/SRO64ls61M9KELJ6LlQTgDR2rB21P2g8PO8K9ayo7XFUDSme32GfSNNy5EB8oXCgCvzGfih2rBwdwdhAvGcQDNxLDbk1serykARDPcbmjqlH5fzCz1+0vBTHpPqoJ7aQdzdyGb7K0GV4DeHVb313UE8BWvf32waSQbUGKoJZbM3gOUK5yCTy0HVcIjyeycILxgxruC8AoBLOlPty95SutIAB9UEWEpxNmIkTsnQEd98K4gHEJ8VQnvdotabQFgeQKALI/yi+5w3kzsZ8YBZd4C8ByUa78koLMenIFtZfjI41NTQNHSLwE4qcw2Td96v9oB3x6+tgKMlQQ6RsA5gPZB8Dz/hVNwL+0MbCua8a56cCBQCTXDnkfAt8r8TVLp0R2Z9ZfrLQB4F+4YgFvHAgcClbBoJk6BsUuZswU3nAn+swk2LWUvF4yT44EDVR6jWGx7ozO9dJyY56shB4R9zHwwxPL8sJADDU7oNkn0GEOsBvFc32Jb82Y8Plp4VQFAuSyHB6fvJlDbKNcpEaEjn0nsHC24rgC3xVLWAsm0EcD8GrGDIHwuHLmpz9J/Hyv8hgLctq6nd6bjlJ5kUAuYmgB5CSFxodR49eSudPr6eMBu+x92o0qop1eWEAAAAABJRU5ErkJggg=="
                        alt="attachment icon"
                      />
                      <span className="card-score-num">
                        {card.attachments.length}
                      </span>

                      <img
                        width={12}
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAEBgAABAYBmSDe8AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAU7SURBVGiB7ZptbFNVGMf/z7nrRrtOGW9RIlFAiUZRSQwvEo1EoyERX8EYQgwhsctYSyjry/h2vii7bRnL1g5WTQgmGsFXIgkS4wfjBBVN+ADiWxCjUWGKw7WMdbvn8QPO3N52c7frXYnZ71v/z7nnPP/03nPOfc4FppjCEWi8DaWU1X9kPfOGNTHdyYRGqDJU38zaSz9JKXPjaT+mkUCgo0Z5hjYBvB7AvQBEOZK0gQJwlAivUrZ6b2fnlsHRGo5qpDEUv1NodBDATQ4kWApnDI0f3/Ni+GSxYFEj/mjbYobqAXCNo6nZ5yIgVqb0baesgYJbZaOU0xjqIK4+EwBwLaDeDQQ6aqyBKqvguextBDDfIl9gIM5KHIOmMk5lmYchvEKolQBCAOpNkZvZk/MB6DQ3LzBCTBsANinca1DV0j2twbNO5PsffNTYsut1wcZxADNGRAWsh8VI3q0VDLa5AV5i1giUqJAJAMDu1uAZYmozawQslVJWm7U8Izmh5sAyARhKfOZYluNEAUctkvhzYNp1eYL5hyZUNSyQ4CEHcrMHoWD9YCXyHvjJXuAc439jpGDWqhT+aGI1A+0gen/ogjeUTjfYuqWvin9kczh2NwMHACwC8xZXff+RjVJOs9NHxY34I/pcEuI9AF6TvMo9UPugnX4qasQnpYdJHARwgyX0vQGjx05fFTOybt0BrWrA+yZA91hC58ngh9N6y0U7/VXMyJwFP8YIWG2RB0mop5KJ8A92+6uIkabozkaAtllkBvi55I7IJ6X0WbKRQKCjZks4dovd65qiifsBbrfqDMRTevhAqfmUZCQYbJuhPLnjhhDf+lt2dkopx9VPIBxbCOAtAJatEL0zx53ZXkouI9g24vN1u3IudQjAYgBgZv/5gdp9UsoxF9etW3dNV0IcAjDLrBPw5ZC7f4OUUtnNxYxtI6767CIQVuQnQxt6B7xvj7aI+XzdrlyN8QaAWy2hn8HGY2kpL9nNw4ptIyl92ykw0kVCa2oHvIc3RfQ6a8A1vT9JwEMWOcNKrUnGor/YzaEYJT0jqVioAcQtRUIPuEk75o/oc0eEpkh8Owg+S7thAtZ2xSMnShm/GCXPWqnWsA6QH1dqT//CwO1MWk8gHFvYFI0/C6IXCi4mNCb10JFSxy7GhNaRlN6cYtBmmMz883o5X2niQ4DSKCg5cXeqNfTyRMYtxoQXxC69uZuI1gPIL20ybgRgfV4+mO3O+ic6ZjHKsrInW5v3E/AEQGPMPnzaNag9I6UcLseYVsq2RUnqocMMfgRAX2GUexVVPdreHiwSKw9l3Wt16aEeVmoVgHMmeZAEP7m7NXimnGNZKfumsSseOaEpdR+AswCGCbyp1I2gHRzZ/XbEI9+5Db6DlZqX1MOvOTGGFceKD4lEOAsg61T/Vir+zl4u8owYShQccwkqrD5OOoyCYwQSKq/6mGckW5c5h/xSPBTTckeSs4G4cuxnRtW7L/9mFgpOrJqiiU8BLDNJvyvSljk9fY5GY8uuBYKNzwHMNMlHU3popbldwcPOjFeI8ozMEmwc3xxNxDXiLxzKtyiKaSnYaIbpbAQAiLDP2rbAyHBf3Uuu+r/8AN1mkmcQsEPxuE+zneRU7kLdXqtYMGul0w1DzFVPA7BVV5ok+khgbbG6cNHptysWPM2srQDwleOpjRNinFRsLE/uCH1dLD7qOtIVC56e7c7cRYQGAD2wvEBNEoqJPgbh+VmezJLdseg3ozW09QlHb7/3euXStPLkODZiyDBm12V+He8nHFNM4RB/AzxYsLsfHL0EAAAAAElFTkSuQmCC"
                        alt="checklist icon"
                      />
                      <span className="card-score-num">
                        {card.checklist.filter(check => check.checked).length}
                        /
                        {card.checklist.length}
                      </span>

                    <span className="card-profile">
                      {card.user.pictureUrl ? (
                        <img
                          className="profile"
                          src={card.user.pictureUrl}
                          alt="profile image"
                        />
                      ) :
                        <img
                          className="profile"
                          src="data:image/png;base64,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"
                          alt="profile image"
                        />
                      }
                    </span>
                    </div>
                  </div>
                </Link>
              )
            })}
            {
              !!Session.user ? (
                <AddNewCard kanbanboardId={kanbanboardId} columnIndex={columnIndex} />
              ) : null
            }
          </div>
        )
      })}
      {
        !!Session.user ? (
          <AddNewColumn kanbanboardId={kanbanboardId}/>
        ) : null
      }
    </div>
  )
};


const AddNewColumn: React.FC<{kanbanboardId: string}> = (props) => {
  const {
    kanbanboardId
  } = props;

  const [columnTitle, setColumnTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setColumnTitle(e.target.value)
  };
  const handleClick = () => {
    addColumn(kanbanboardId, columnTitle);
    setColumnTitle("")
  };

  return (
    <div className="add-list">
      <input
        className="column-input"
        placeholder="Add another list"
        onChange={handleChange}
        value={columnTitle}
      />
      <span className="add-list-btn" onClick={handleClick}>
        +
      </span>
    </div>
  )
};

const AddNewCard: React.FC<{kanbanboardId: string, columnIndex: number}>
  = (props) => {
  const {
    kanbanboardId,
    columnIndex
  } = props;
  const [cardTitle, setCardTitle] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardTitle(e.target.value)
  };

  const handleClick = () => {
    addCard(kanbanboardId, columnIndex, cardTitle);
    setCardTitle("")
  };

  return (
    <div>
      <input
        className="card-input"
        placeholder="Add another card"
        onChange={handleChange}
        value={cardTitle}
      />
      <span className="add-card-btn" onClick={handleClick}>
        +
      </span>
    </div>
  )
};


export default Kanbanboard