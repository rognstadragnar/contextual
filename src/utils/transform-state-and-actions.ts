import { IStateAndActions, MapAction, MapState } from './../index.d'

function transformStateAndActions(
  { state, actions }: IStateAndActions,
  mapStateToProps: MapState,
  mapActionsToProps: MapAction
) {
  const hasMappingFns =
    typeof mapStateToProps === 'function' ||
    typeof mapActionsToProps === 'function'

  if (!hasMappingFns) {
    return { state, actions }
  }

  let mergedState: object = {}

  if (typeof mapStateToProps === 'function') {
    mergedState = {
      ...mergedState,
      ...mapStateToProps(state)
    }
  } else if (mapStateToProps === true) {
    mergedState = { ...mergedState, ...state }
  }

  if (typeof mapActionsToProps === 'function') {
    mergedState = {
      ...mergedState,
      ...mapActionsToProps(actions, state)
    }
  } else if (mapActionsToProps === true) {
    mergedState = { ...mergedState, actions }
  }
  return { state: mergedState, isMerged: true }
}

export { transformStateAndActions }
