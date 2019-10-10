vault {
  renew_token = false
  vault_agent_token_file = "/home/vault/.vault-token"
  retry {
    backoff = "1s"
  }
}

template {
  destination = "/etc/secrets/.env"
  contents = <<EOH
  {{- with secret "secret/data/bolagetio/ELASTIC_HOST?version=1" -}}
  ELASTIC_HOST={{ .Data.data.ELASTIC_HOST }}
  {{- end }}
  EOH
}