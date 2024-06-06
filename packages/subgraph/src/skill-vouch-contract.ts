import {
  RequestClosed as RequestClosedEvent,
  RequestCreated as RequestCreatedEvent,
  RequestStatusChanged as RequestStatusChangedEvent,
  SkillVouched as SkillVouchedEvent,
  VoteCasted as VoteCastedEvent
} from "../generated/SkillVouchContract/SkillVouchContract"
import {
  RequestClosed,
  RequestCreated,
  RequestStatusChanged,
  SkillVouched,
  VoteCasted
} from "../generated/schema"

export function handleRequestClosed(event: RequestClosedEvent): void {
  let entity = new RequestClosed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.accepted = event.params.accepted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestCreated(event: RequestCreatedEvent): void {
  let entity = new RequestCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.user = event.params.user
  entity.skill = event.params.skill
  entity.project = event.params.project
  entity.experience = event.params.experience
  entity.stakeAmount = event.params.stakeAmount
  entity.linkedInLink = event.params.linkedInLink
  entity.gitHubLink = event.params.gitHubLink

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestStatusChanged(
  event: RequestStatusChangedEvent
): void {
  let entity = new RequestStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity._newStatus = event.params._newStatus

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSkillVouched(event: SkillVouchedEvent): void {
  let entity = new SkillVouched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.vouchor = event.params.vouchor
  entity.stakedAmount = event.params.stakedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = new VoteCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.voter = event.params.voter
  entity.acceptance = event.params.acceptance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
