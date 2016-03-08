/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelaySubscriptionRequest
 * @typechecks
 * @flow
 */

'use strict';

var Deferred = require('Deferred');
import type {PrintedQuery} from 'RelayInternalTypes';
import type RelayQuery from 'RelayQuery';
import type {SubscriptionResult, Variables} from 'RelayTypes';

var printRelayQuery = require('printRelayQuery');

/**
 * @internal
 *
 * Instances of these are made available via `RelayNetworkLayer.sendSubscription`.
 */
class RelaySubscriptionRequest extends Deferred<SubscriptionResult, Error> {
  _subscription: RelayQuery.Subscription;
  _printedQuery: ?PrintedQuery;

  constructor(subscription: RelayQuery.Subscription) {
    super();
    this._subscription = subscription;
    this._printedQuery = null;
  }

  /**
   * @public
   *
   * Gets a string name used to refer to this request for printing debug output.
   */
  getDebugName(): string {
    return this._subscription.getName();
  }

  /**
   * @public
   *
   * Gets the variables used by the subscription. These variables should be
   * serialized and sent in the GraphQL request.
   */
  getVariables(): Variables {
    var printedQuery = this._printedQuery;
    if (!printedQuery) {
      printedQuery = printRelayQuery(this._subscription);
      this._printedQuery = printedQuery;
    }
    return printedQuery.variables;
  }

  /**
   * @public
   *
   * Gets a string representation of the GraphQL subscription.
   */
  getQueryString(): string {
    var printedQuery = this._printedQuery;
    if (!printedQuery) {
      printedQuery = printRelayQuery(this._subscription);
      this._printedQuery = printedQuery;
    }
    return printedQuery.text;
  }

  /**
   * @public
   * @unstable
   */
  getSubscription(): RelayQuery.Subscription {
    return this._subscription;
  }
}
