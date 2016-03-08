/**
 * 💩
 *
 * @providesModule RelayMutation
 * @typechecks
 * @flow
 */

'use strict';

import type GraphQL from 'GraphQL';

/**
 * @public
 *
 * RelaySubscription is the base class for modeling subscriptions to remote data.
 */
class RelaySubscription<Tp: {[key: string]: mixed}> {
  static name: $FlowIssue;

  props: Tp;

  constructor(props: Tp) {
    this._didShowFakeDataWarning = false;
    this.props = props;
  }

  getSubscription(): GraphQL.Subsctription {
    invariant(
      false,
      '%s: Expected abstract method `getSubscription` to be implemented.',
      this.constructor.name
    );
  }

  getConfigs(): Array<RelayMutationConfig> {
    invariant(
      false,
      '%s: Expected abstract method `getConfigs` to be implemented.',
      this.constructor.name
    );
  }

  getVariables(): {[name: string]: mixed} {
    invariant(
      false,
      '%s: Expected abstract method `getVariables` to be implemented.',
      this.constructor.name
    );
  }
}

module.exports = RelaySubscription;
