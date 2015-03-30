# encoding: utf-8
# This file originally created at http://rove.io/c1dc86b08c3f4d7fff38874d64f9c0c9

# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/trusty64"
  config.ssh.forward_agent = true

  config.vm.network :forwarded_port, guest: 1337, host: 1337

  config.vm.provider "virtualbox" do |v|
    v.memory = 2048
    v.cpus = 2
  end
  
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks"]
    chef.add_recipe :apt
    chef.add_recipe "apt::default"
    chef.add_recipe 'nginx'
    chef.add_recipe 'git'
    chef.add_recipe 'vim'
    chef.add_recipe 'mariadb::default'
    chef.add_recipe 'redis'
    #chef.add_recipe 'ruby_build'
    #chef.add_recipe 'rbenv::user'
    chef.add_recipe 'tmux'
    chef.add_recipe 'nodejs'
    chef.add_recipe 'rabbitmq'
    
    chef.json = {
      :nginx => {
        :dir                => "/etc/nginx",
        :log_dir            => "/var/log/nginx",
        :binary             => "/usr/sbin/nginx",
        :user               => "www-data",
        :init_style         => "runit",
        :pid                => "/var/run/nginx.pid",
        :worker_connections => "1024"
      },
      :mariadb => {
        :use_default_repository => true
      },
      :git   => {
        :prefix => "/usr/local"
      },
      :redis => {
        :bind        => "127.0.0.1",
        :port        => "6379",
        :config_path => "/etc/redis/redis.conf",
        :daemonize   => "yes",
        :timeout     => "300",
        :loglevel    => "notice"
      },
      :rbenv => {
        :user_installs => [
          {
            :user   => "vagrant",
            :rubies => [
              "2.1.5"
            ],
            :global => "2.1.5"
          }
        ]
      }
    }
  end
end

