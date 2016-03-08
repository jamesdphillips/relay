/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayMutationTransaction
 * @typechecks
 * @flow
 */

'use strict';

var RelayConnectionInterface = require('RelayConnectionInterface');
import type {ClientMutationID} from 'RelayInternalTypes';
import type {
  RelayMutationConfig, // TODO
  RelaySubscriptionConnectCallbacks,
  RelaySubscriptionConnectNextCallback,
  RelaySubscriptionConnectErrorCallback,
  Variables
} from 'RelayTypes';

var {CLIENT_MUTATION_ID} = RelayConnectionInterface;
var transactionIDCounter = 0;

class RelaySubscriptionConnection {
  _id: ClientMutationID;
  _subscription: RelaySubscription;

  constructor(subscription: RelaySubscription) {
    this._id = (transactionIDCounter++).toString(36);
    this._subscription = subscription;
    this._connection = null;
  }

  connect(callbacks?: RelaySubscriptionConnectCallbacks): void {
    // okay ..?
    var request = new RelaySubscriptionRequest(
      this._subscription,
      this._getFiles()
    );
    RelayNetworkLayer.sendMutation(request);
  }

  dispose() {
    // TODO disconnect from socket(?)
  }
}
