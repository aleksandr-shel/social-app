
namespace backend.Helper
{
    public class Helper
    {
        public static string GetRDSConnectionString()
        {
            var appConfig = System.Configuration.ConfigurationManager.AppSettings;

            //string dbname = appConfig["RDS_DB_NAME"];
            string dbname = Environment.GetEnvironmentVariable("RDS_DB_NAME");

            if (string.IsNullOrEmpty(dbname)) return null;

            //string username = appConfig["RDS_USERNAME"];
            string username = Environment.GetEnvironmentVariable("RDS_USERNAME");
            //string password = appConfig["RDS_PASSWORD"];
            string password = Environment.GetEnvironmentVariable("RDS_PASSWORD");
            //string hostname = appConfig["RDS_HOSTNAME"];
            string hostname = Environment.GetEnvironmentVariable("RDS_HOSTNAME");
            //string port = appConfig["RDS_PORT"];
            string port = Environment.GetEnvironmentVariable("RDS_PORT");

            return "Data Source=" + hostname + "," + port + ";database=" + dbname + ";user=" + username + ";password=" + password + ";";
        }

        public static string GetTokenKey()
        {
            var appConfig = System.Configuration.ConfigurationManager.AppSettings;
            string tokenKey = Environment.GetEnvironmentVariable("TokenKey");
            //string tokenKey = appConfig["TokenKey"];
            return tokenKey;
        }

        public static string GetAWSAccessKey()
        {
            var appConfig = System.Configuration.ConfigurationManager.AppSettings;
            string accessKey = Environment.GetEnvironmentVariable("AWSCredentialsAccessKeyID");
            //string accessKey = appConfig["AWSCredentialsAccessKeyID"];
            return accessKey;
        }

        public static string GetAWSSecretKey()
        {
            var appConfig = System.Configuration.ConfigurationManager.AppSettings;
            string secretKey = Environment.GetEnvironmentVariable("AWSCredentialsSecretAccessKey");
            //string secretKey = appConfig["AWSCredentialsSecretAccessKey"];
            return secretKey;
        }

        static void SetEbConfig()
        {
            var tempConfigBuilder = new ConfigurationBuilder();

            tempConfigBuilder.AddJsonFile(
                @"C:\Program Files\Amazon\ElasticBeanstalk\config\containerconfiguration",
                optional: true,
                reloadOnChange: true
            );

            var configuration = tempConfigBuilder.Build();

            var ebEnv =
                configuration
                    .GetChildren()
                    .ToDictionary(child => child.Key, child => child.Value);

            foreach (var keyVal in ebEnv)
            {
                Environment.SetEnvironmentVariable(keyVal.Key, keyVal.Value);
            }
        }
    }
}
