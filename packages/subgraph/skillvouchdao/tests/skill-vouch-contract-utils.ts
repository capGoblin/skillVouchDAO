import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  RequestClosed,
  RequestCreated,
  RequestStatusChanged,
  SkillVouched,
  VoteCasted
} from "../generated/SkillVouchContract/SkillVouchContract"

export function createRequestClosedEvent(
  requestId: BigInt,
  accepted: boolean
): RequestClosed {
  let requestClosedEvent = changetype<RequestClosed>(newMockEvent())

  requestClosedEvent.parameters = new Array()

  requestClosedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestClosedEvent.parameters.push(
    new ethereum.EventParam("accepted", ethereum.Value.fromBoolean(accepted))
  )

  return requestClosedEvent
}

export function createRequestCreatedEvent(
  requestId: BigInt,
  user: Address,
  skill: string,
  project: string,
  experience: string,
  stakeAmount: BigInt,
  linkedInLink: string,
  gitHubLink: string
): RequestCreated {
  let requestCreatedEvent = changetype<RequestCreated>(newMockEvent())

  requestCreatedEvent.parameters = new Array()

  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("skill", ethereum.Value.fromString(skill))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("project", ethereum.Value.fromString(project))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("experience", ethereum.Value.fromString(experience))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "stakeAmount",
      ethereum.Value.fromUnsignedBigInt(stakeAmount)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "linkedInLink",
      ethereum.Value.fromString(linkedInLink)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("gitHubLink", ethereum.Value.fromString(gitHubLink))
  )

  return requestCreatedEvent
}

export function createRequestStatusChangedEvent(
  requestId: BigInt,
  _newStatus: i32
): RequestStatusChanged {
  let requestStatusChangedEvent = changetype<RequestStatusChanged>(
    newMockEvent()
  )

  requestStatusChangedEvent.parameters = new Array()

  requestStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "_newStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_newStatus))
    )
  )

  return requestStatusChangedEvent
}

export function createSkillVouchedEvent(
  requestId: BigInt,
  vouchor: Address,
  stakedAmount: BigInt
): SkillVouched {
  let skillVouchedEvent = changetype<SkillVouched>(newMockEvent())

  skillVouchedEvent.parameters = new Array()

  skillVouchedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  skillVouchedEvent.parameters.push(
    new ethereum.EventParam("vouchor", ethereum.Value.fromAddress(vouchor))
  )
  skillVouchedEvent.parameters.push(
    new ethereum.EventParam(
      "stakedAmount",
      ethereum.Value.fromUnsignedBigInt(stakedAmount)
    )
  )

  return skillVouchedEvent
}

export function createVoteCastedEvent(
  requestId: BigInt,
  voter: Address,
  acceptance: boolean
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "acceptance",
      ethereum.Value.fromBoolean(acceptance)
    )
  )

  return voteCastedEvent
}
