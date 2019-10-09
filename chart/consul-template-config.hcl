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
  {{- with secret "secret/data/bolagetio/VAULT_TEST?version=1" }}
  VAULT_TEST: {{ .Data.data.VAULT_TEST }}
  {{ end }}
  EOH
}