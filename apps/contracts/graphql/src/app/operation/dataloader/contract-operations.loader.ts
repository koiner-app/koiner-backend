// TODO: Fix

// import { Injectable, Scope } from '@nestjs/common';
// import { QueryBus } from '@nestjs/cqrs';
// import * as DataLoader from 'dataloader';
// import { SearchResponse } from '@appvise/domain';
// import { ContractOperation } from '@koiner/contracts/domain';
// import { ContractOperationsQuery } from '@koiner/contracts/application';
// import { OperationsRequest } from '@koiner/chain/api/graphql/operation/dto/operations.request';
// import { ContractOperationNode } from '../dto/contract-operation.node';
//
// @Injectable({ scope: Scope.REQUEST })
// export class ContractOperationsLoader {
//   constructor(private readonly queryBus: QueryBus) {}
//
//   public readonly batch = new DataLoader(async (operationIds: string[]) => {
//     const request = new OperationsRequest();
//     request.first = 1000;
//     request.filter = {
//       OR: operationIds.map((operationId) => {
//         return { id: { equals: operationId } };
//       }),
//     };
//     const selectionSet = undefined;
//
//     const searchResponse = await this.queryBus.execute<
//       ContractOperationsQuery,
//       SearchResponse<ContractOperation>
//     >(new ContractOperationsQuery(request, selectionSet));
//
//     const operationsMap = new Map(
//       searchResponse.results.map((result) => [
//         result.item.id.value,
//         new ContractOperationNode(result.item),
//       ]),
//     );
//
//     return operationIds.map((operationId) => operationsMap.get(operationId));
//   });
// }
