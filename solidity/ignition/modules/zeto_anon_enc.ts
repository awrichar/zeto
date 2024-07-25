// Copyright © 2024 Kaleido, Inc.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DepositVerifierModule = buildModule("Groth16Verifier_CheckValue", (m) => {
  const verifier = m.contract('Groth16Verifier_CheckValue', []);
  return { verifier };
});

const WithdrawVerifierModule = buildModule("Groth16Verifier_CheckInputsOutputsValue", (m) => {
  const verifier = m.contract('Groth16Verifier_CheckInputsOutputsValue', []);
  return { verifier };
});

const VerifierModule = buildModule("Groth16Verifier_AnonEnc", (m) => {
  const verifier = m.contract('Groth16Verifier_AnonEnc', []);
  return { verifier };
});

export default buildModule("Zeto_AnonEnc", (m) => {
  const { verifier } = m.useModule(VerifierModule);
  const { verifier: depositVerifier } = m.useModule(DepositVerifierModule);
  const { verifier: withdrawVerifier } = m.useModule(WithdrawVerifierModule);
  const commonlib = m.library('Commonlib');

  const registryAddress = m.getParameter("registry");
  const registry = m.contractAt('Registry', registryAddress);

  const zeto = m.contract('Zeto_AnonEnc', [depositVerifier, withdrawVerifier, verifier, registry], {
    libraries: {
      Commonlib: commonlib,
    },
  });

  return { zeto };
});