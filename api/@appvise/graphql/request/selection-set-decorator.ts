import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SelectionSet as SelectionSetModel } from '@appvise/domain';

export const SelectionSet = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const selectionSet = transformFieldNodes(ctx.getInfo().fieldNodes[0]);

    return new SelectionSetModel(selectionSet);
  },
);

/**
 * Transform GraphQL fieldNodes into SelectionSet
 * @param selection
 * @param nodeIndex
 */
function transformFieldNodes(selection: any, nodeIndex?: number) {
  const selectedFields: Record<string, any> = {};

  selection.selectionSet.selections.forEach((subSelection) => {
    if (subSelection.selectionSet !== undefined) {
      // Add sub selections
      selectedFields[subSelection.name.value] = transformFieldNodes(
        subSelection,
        nodeIndex + 1,
      );
    } else {
      // Add field
      selectedFields[subSelection.name.value] = true;
    }
  });

  return selectedFields;
}
