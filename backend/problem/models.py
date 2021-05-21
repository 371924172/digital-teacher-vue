from django.db import models


class Problem(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    problem_id = models.CharField(db_column='PROBLEM_ID', max_length=32)  # Field name made lowercase.
    puid = models.CharField(db_column='PUID', max_length=32, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=128)  # Field name made lowercase.
    problem_decription = models.TextField(db_column='PROBLEM_DECRIPTION', blank=True,
                                          null=True)  # Field name made lowercase.
    module_decription = models.TextField(db_column='MODULE_DECRIPTION', blank=True,
                                         null=True)  # Field name made lowercase.
    input_decription = models.TextField(db_column='INPUT_DECRIPTION', blank=True,
                                        null=True)  # Field name made lowercase.
    output_decription = models.TextField(db_column='OUTPUT_DECRIPTION', blank=True,
                                         null=True)  # Field name made lowercase.
    test_decription = models.CharField(db_column='TEST_DECRIPTION', max_length=32, blank=True,
                                       null=True)  # Field name made lowercase.
    difficulty = models.IntegerField(db_column='DIFFICULTY', blank=True, null=True)  # Field name made lowercase.
    resource_limit = models.DecimalField(db_column='RESOURCE_LIMIT', max_digits=32, decimal_places=10, blank=True,
                                         null=True)  # Field name made lowercase.
    freq_limit = models.DecimalField(db_column='FREQ_LIMIT', max_digits=32, decimal_places=10, blank=True,
                                     null=True)  # Field name made lowercase.
    power_limit = models.DecimalField(db_column='POWER_LIMIT', max_digits=32, decimal_places=10, blank=True,
                                      null=True)  # Field name made lowercase.
    public_status = models.IntegerField(db_column='PUBLIC_STATUS', blank=True, null=True)  # Field name made lowercase.
    platform = models.IntegerField(db_column='PLATFORM', blank=True, null=True)  # Field name made lowercase.
    publish_status = models.IntegerField(db_column='PUBLISH_STATUS', blank=True,
                                         null=True)  # Field name made lowercase.
    pcateory = models.CharField(db_column='PCATEORY', max_length=1024, blank=True,
                                null=True)  # Field name made lowercase.
    ptag = models.CharField(db_column='PTAG', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    source = models.CharField(db_column='SOURCE', max_length=1024, blank=True, null=True)  # Field name made lowercase.
    online_testbench = models.CharField(db_column='ONLINE_TESTBENCH', max_length=1024, blank=True,
                                        null=True)  # Field name made lowercase.
    online_testbench_md5 = models.CharField(db_column='ONLINE_TESTBENCH_MD5', max_length=128, blank=True,
                                            null=True)  # Field name made lowercase.
    board_testbench = models.CharField(db_column='BOARD_TESTBENCH', max_length=1024, blank=True,
                                       null=True)  # Field name made lowercase.
    board_testbench_md5 = models.CharField(db_column='BOARD_TESTBENCH_MD5', max_length=128, blank=True,
                                           null=True)  # Field name made lowercase.
    created_by = models.CharField(db_column='CREATED_BY', max_length=32, blank=True,
                                  null=True)  # Field name made lowercase.
    created_time = models.DateTimeField(db_column='CREATED_TIME', blank=True, null=True)  # Field name made lowercase.
    updated_by = models.CharField(db_column='UPDATED_BY', max_length=32, blank=True,
                                  null=True)  # Field name made lowercase.
    updated_time = models.DateTimeField(db_column='UPDATED_TIME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'ego_problem'


class Ptag(models.Model):
    id = models.AutoField(db_column='ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=32, blank=True, null=True)  # Field name made lowercase.
    created_by = models.CharField(db_column='CREATED_BY', max_length=32, blank=True, null=True)  # Field name made lowercase.
    created_time = models.DateTimeField(db_column='CREATED_TIME', blank=True, null=True)  # Field name made lowercase.
    updated_by = models.CharField(db_column='UPDATED_BY', max_length=32, blank=True, null=True)  # Field name made lowercase.
    updated_time = models.DateTimeField(db_column='UPDATED_TIME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'ego_ptag'