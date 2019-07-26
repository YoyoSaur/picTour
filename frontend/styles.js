import styled from "@emotion/styled"
export const Nav = styled("div")`
  & > * {
    margin-left: 1em;
    color: white;
  }
  background: purple;
  padding: 1em;
  height: 2em;
  display: flex;
  align-items: center;
`
export const PageBody = styled("div")`
  background: lightgrey;
  width: 100%;
  height: 100%;
  padding: 2em;
`