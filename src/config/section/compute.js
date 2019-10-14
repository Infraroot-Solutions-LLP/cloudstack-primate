export default {
  name: 'compute',
  title: 'Compute',
  icon: 'cloud',
  children: [
    {
      name: 'vm',
      title: 'Instances',
      icon: 'desktop',
      permission: [ 'listVirtualMachinesMetrics', 'listVirtualMachines' ],
      resourceType: 'UserVm',
      columns: [
        { 'name': (record) => { return record.displayname } }, 'state', 'instancename',
        { 'ipaddress': (record) => { return record.nic[0].ipaddress } }, 'account', 'zonename',
        'cpunumber', 'cpuused', 'cputotal', 'memoryintfreekbs', 'memorytotal',
        'networkread', 'networkwrite', 'diskkbsread', 'diskkbswrite', 'diskiopstotal'
      ],
      related: [{
        name: 'vmsnapshot',
        title: 'VM Snapshots',
        param: 'virtualmachineid'
      }, {
        name: 'affinitygroup',
        title: 'Affinity Groups',
        param: 'virtualmachineid'
      }],
      tabs: [{
        name: 'hardware',
        component: () => import('@/views/compute/InstanceHardware.vue')
      }, {
        name: 'settings',
        component: () => import('@/views/setting/ResourceSettingsTab.vue')
      }],
      hidden: ['instancename', 'account'],
      actions: [
        {
          api: 'deployVirtualMachine',
          icon: 'plus',
          label: 'label.vm.add',
          listView: true,
          component: () => import('@/views/compute/DeployVM.vue')
        },
        {
          api: 'updateVirtualMachine',
          icon: 'edit',
          label: 'Update VM',
          dataView: true,
          args: ['name', 'displayname', 'ostypeid', 'isdynamicallyscalable', 'haenable', 'group']
        },
        {
          api: 'startVirtualMachine',
          icon: 'caret-right',
          label: 'Start VM',
          dataView: true,
          groupAction: true,
          hidden: (record) => { return record.state !== 'Stopped' },
          args: ['podid', 'clusterid', 'hostid']
        },
        {
          api: 'stopVirtualMachine',
          icon: 'stop',
          label: 'label.action.stop.instance',
          dataView: true,
          groupAction: true,
          options: ['podid', 'clusterid', 'hostid'],
          hidden: (record) => { return record.state !== 'Running' }
        },
        {
          api: 'rebootVirtualMachine',
          icon: 'sync',
          label: 'label.action.reboot.instance',
          dataView: true,
          hidden: (record) => { return record.state !== 'Running' }
        },
        {
          api: 'restoreVirtualMachine',
          icon: 'usb',
          label: 'label.reinstall.vm',
          dataView: true,
          args: ['virtualmachineid']
        },
        {
          api: 'updateVMAffinityGroup',
          icon: 'swap',
          label: 'label.change.affinity',
          dataView: true,
          args: ['id', 'serviceofferingid']
        },
        {
          api: 'changeServiceForVirtualMachine',
          icon: 'sliders',
          label: 'Change Service Offering',
          dataView: true,
          args: ['id', 'serviceofferingid']
        },
        {
          api: 'createVMSnapshot',
          icon: 'camera',
          label: 'Create VM Snapshot',
          dataView: true
        },
        {
          api: 'attachIso',
          icon: 'paper-clip',
          label: 'label.action.attach.iso',
          dataView: true,
          args: ['id', 'virtualmachineid']
        },
        {
          api: 'detachIso',
          icon: 'link',
          label: 'label.action.detach.iso',
          dataView: true,
          args: ['id', 'virtualmachineid']
        },
        {
          api: 'migrateVirtualMachine',
          icon: 'drag',
          label: 'label.migrate.instance.to.host',
          dataView: true,
          hidden: (record) => { return record.state !== 'Running' }
        },
        {
          api: 'resetPasswordForVirtualMachine',
          icon: 'key',
          label: 'Reset Instance Password',
          dataView: true,
          args: ['id']
        },
        {
          api: 'resetSSHKeyForVirtualMachine',
          icon: 'lock',
          label: 'Reset SSH Key',
          dataView: true
        },
        {
          api: 'assignVirtualMachine',
          icon: 'user-add',
          label: 'Assign Instance to Another Account',
          dataView: true
        },
        {
          api: 'destroyVirtualMachine',
          icon: 'delete',
          label: 'label.action.destroy.instance',
          args: ['id'],
          dataView: true,
          groupAction: true
        }
      ]
    },
    /*
    {
      name: 'demo',
      title: 'Demo',
      icon: 'radar-chart',
      permission: [ 'listVirtualMachines' ],
      component: () => import('@/components/Test.vue')
    },
    */
    {
      name: 'ssh',
      title: 'SSH Key Pairs',
      icon: 'key',
      permission: [ 'listSSHKeyPairs' ],
      columns: ['name', 'fingerprint', 'account', 'domain'],
      details: ['name', 'fingerprint', 'account', 'domain'],
      actions: [
        {
          api: 'createSSHKeyPair',
          icon: 'plus',
          label: 'Create SSH key pair',
          listView: true,
          args: ['name', 'publickey', 'domainid']
        },
        {
          api: 'deleteSSHKeyPair',
          icon: 'delete',
          label: 'Delete SSH key pair',
          dataView: true,
          args: ['name', 'domainid', 'account']
        }
      ]
    },
    {
      name: 'affinitygroup',
      title: 'Affinity Groups',
      icon: 'swap',
      permission: [ 'listAffinityGroups' ],
      columns: ['name', 'type', 'description', 'account', 'domain'],
      details: ['name', 'id', 'description', 'type', 'account', 'domain'],
      actions: [
        {
          api: 'createAffinityGroup',
          icon: 'plus',
          label: 'New Affinity Group',
          listView: true,
          args: ['name', 'description', 'type']
        },
        {
          api: 'deleteAffinityGroup',
          icon: 'delete',
          label: 'Delete Affinity Group',
          dataView: true,
          args: ['id']
        }
      ]
    }
  ]
}
